Probably the single largest project I have undertaken last year. This project was stretched out over three iterations, with three different teams.

Perhaps what I'm was proud last year is the production of our showreel for Rendezvous. Watch:

<iframe src="https://player.vimeo.com/video/117585029" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Rendezvous is an application aimed at backpackers. It enables offline social interaction through the use of iBeacons. We built the actual application using Meteor.js and it works great on iPhones. Here's a simple code snippet:

```javascript
var requireLogin = function() {
  if (!Meteor.user()) {
    this.render('login');
  } else if (checkUserType) {
    if (!Session.get('hostelId')) {
      this.render('nfcId');
    } else {
      this.next();
    }
  } else if (!checkUserType) {
    Session.set('hostelId', Meteor.user()._id);
    this.next();
  }
};
Router.onBeforeAction(requireLogin);
```

*I'm writing a more elaborate article for this project right now. Stay tuned.*

You can find the whole project on [GitHub](https://github.com/nickrttn/rendezvous). Feel free to fork, change, redistribute.
