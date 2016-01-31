Meal planning takes me and my girlfriend (mostly her, but I don't like conforming to gender roles) about an hour and a half each week. We plan all of the dinners for the week in one go and make a shopping list. This way, we can get our grocery shopping done in one go and be done with it. My girlfriend hates meal planning.

So I promised her a web application.

> For this one, I went full nerd.

*What now?*

Yes. You heard me. Her very own meal planning application. I call it Week of Food (copyright pending).

One thing about her that I love is that she is very meticulous about recipes. Once we cooked something and liked it goes into an [awesomely organized Trello-board](https://trello.com/b/9tkkvRNf/eten). Feel free to peruse it for dinner inspiration.

Soooo, Trello has an API right? Should be easy enough. This application had to be based on NodeJS. I had not really made an application with it that's more complicated than [serving static pages](http://pennyparkerpaper.com/) and [handling email](http://ons.design/).

Before I started building, I set myself some goals. I wanted to try implementing oAuth, use MongoDB, and do most things async. I also wanted to learn a little about ES2015 (or ES6, what have you?). You could say `'use strict';` was the first thing I did.

### oAuth

My starting point in this application was user authentication. I use [Passport](http://passportjs.org) for oAuth. I wanted to have users log in using their Trello credentials. I do a couple of things during the authentication process:

Check if the user is already in the database. If he isn't, create an account. The first line starts the oAuth process. The rest of the code is the callback that is called when it finishes succesfully.

```javascript
// Set up the Passport Strategy
passport.use('trello', new oAuthStrategy(config.trello, (req, token, tokenSecret, profile, done) => {
    // Initialize a connection with Trello using those tokens we just got.
    let t = new Trello(config.trello.consumerKey, token);

    // request the user profile
    t.get('/1/members/me', (err, data) => {

      // console.log(data);

      // Find or create the User by trelloId
      User.findOrCreate({ trelloId: data.id }, {
        token:        token,
        fullName:     data.fullName,
        username:     data.username,
        email:        data.email,
        boards:       data.idBoards,
        avatarSource: data.avatarSource
      }, (err, user, created) => {
        if (err) throw err;
        done(null, user);
      });
    });
	}
));
```

Check if the user has a Gravatar account. If he does, retrieve the image and store it in Mongo's GridFS. If he doesn't, render an upload form on his profile page. I split up this code in two helper functions, one a simple `if` statement, while the other does the heavy lifting.

In the first function, I pass back the `_id` of the avatar if the user has one, and otherwise call the Gravatar retrieval function or set the `_id` to `false` if he doesn't.

*Disclaimer:* Yes, I know GridFS is overkill for this task, as it is meant for files of >16Mb. I just wanted to try it. See this as proof of concept.

```javascript
	// getAvatar: checks if user has Gravatar and saves file in GridFS
	// after checking if it exists. If user doesn't have Gravatar or the
	// file exists, either render the file or render an upload form.
  this.getAvatar = function getAvatar(user, cb) {
    // If the user already has an avatarId, he must have an avatar.
    // return the avatarId to the user.
    if (user.avatarId) {
      cb(user.avatarId);
    } else {
      if (user.avatarSource == 'gravatar') {
        // If the user doesn't have an avatar ID we must create an avatar.
        // Download it from Gravatar and store it in GridFS.
        this.storeGravatar(user, cb);
      } else {
        cb(false);
      }
    }
  }
```

In the second function, I use the `request` package to get the users Gravatar image. `request` returns a stream, which is piped into a MongoDB GridFS writestream once it starts. When it closes, the user is found and updated with the `_id` of the avatar that was just saved into MongoDB.

```javascript
  this.storeGravatar = function storeGravatar(user, cb) {
    // Set up the request, where encoding: null makes request send
    // an actual Buffer instead of something else.

    let params = {
      encoding: null,
      url: gravatar.url(user.email, { s: '500', d: '404' }, true)
    };

    // Create the request
    let avatar = request.get(params);

    // When we get a response
    avatar.on('response', (res) => {

      // Create a GridFS WriteStream and set it up
      let writestream = gfs.createWriteStream({
        filename: user.username + '.' + res.headers['content-type'].split('/')[1],
        content_type: res.headers['content-type'],
        mode: 'w',
        metadata: {
          belongs_to: user._id
        }
      });

      // Pipe the data into the writestream
      avatar.pipe(writestream);

      // When it's closed, update the user with the avatarId that's just been created.
      writestream.on('close', (file) => {
        User.findOneAndUpdate({ _id: user._id }, { avatarId: file._id }, { new: true }, (err, user) => {
          cb(user.avatarId);
        });
      });
    });
  }
```

When both of the before calls finish successfully, the user is redirected to a profile page, where he can pick the Trello board his recipes are on with a simple form. Once the user picked his board they can start filtering and randomizing their recipes.

![Week of Food Filters illustration](/images/articles/wof_filter.png)

It has a simple filter system with checkboxes, based on Dave DeSandro's excellent [Isotope](http://isotope.metafizzy.co/). The ‘Gimme 5 recipes’ button works with Underscore.js' `_.sample` function, which randomly returns `n` number of items from an array.

The final ‘Hell yes’ button retrieves the id's of the remaining recipes and sends them to the server in a POST. The user is then redirected to a page where he can see his recipes, including preparation instructions, for the week.

### To do

I'd like to expand this application in the future. Right now, it doesn't present the user with a shopping list. I would really like that feature to happen. I just need to find a way to parse Markdown blobs and tally up multiple of the same ingredients (which are often not in the same unit).

My final code can do with some DRY'ing out. It would also be useful to send recipes to users on a daily basis through email, so they do not have to look up the application but can get started cooking right away. Zero state is also something I've considered. I'd like users to be able to start off using my own recipes board, while collecting recipes for their own boards.

As a way to prepare for a more technical minor I'd like to follow I would want to do it all over in another language or framework, like Ruby on Rails or perhaps MeteorJS.

### Captain hindsight

I learned a lot doing this application but mainly I learned to put a M(ongo)E(xpress)N(ode) stack to good use by solving real user stories. If I'd do it again, I would try to abstract more, and keep my code cleaner. You can check it out on GitHub: [github.com/nickrttn/weekoffood](//github.com/nickrttn/weekoffood)
