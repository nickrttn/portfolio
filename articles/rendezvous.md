Probably the single largest project I have undertaken last year. This project was stretched out over three iterations, with three different teams. My role in this project was front-end developer, as well as project manager.

## Phase 1: inspiration

The assignment of this project was clear: get people together, using the Internet of Things. Clear isn't always simple though. There was no assigned target audience, and no readily apparent business goals to strive for. So we had to come up with those.

In a couple of brainstorming sessions we decided on our users: backpackers. Open-minded, already up for adventure this group of people shouldn't be too hard to bring together right? We had a lot of travelers in our group and all of us were excited to get designing for these users.

## Phase 2: ideation

We first set off imagining what the end result of this project would be like. How would using it feel for our users? What emotions would they have while using it? To express our vision and entice our users for our application, we created a showreel.

<figure class="video">
	<iframe src="https://player.vimeo.com/video/117585029?byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	<figcaption>1. Showreel for Rendezvous</figcaption>
</figure>

## Phase 3: application

Backpackers usually have limited access to the internet in other countries so we had to keep data transfer and client/server interaction as minimal and simple as possible, the *real* interaction was intended to be offline.

We came up with a concept that has backpackers use an application, in tandem with a single, cheap, iBeacon, only once. Imagine a hostel. It's a little dank and smelly, as hostels usually are. The people look nice enough though, but you don't know anyone. You just started traveling for the summer so you're a little out of just stepping up to people.

Our application is built for this. We enable backpackers to have meaningful offline interaction, without needing their phone to do it. It works like this: there's a spot in the hostel with our poster. It has an iBeacon attached to it. The thing has a reach of about 80m, but the poster doubles as a meeting place. You can download our application and when it finds the iBeacon it will show you all events attached to that specific iBeacon. It is supposed to be hyperlocal. It only works right there. So you sign up for an event, it shows you how many people will be joining, what the event is, and where to meet up. You don't need your phone to do that. And you won't have WiFi outside the hostel anyway. This disables the hurdles of having to step up to people and gets you right in the middle of the action.

In short: Rendezvous is an application aimed at backpackers. It enables offline social interaction through the use of iBeacons. I solely built the actual application using Meteor.js and for now it works on iPhones. Here's a very small simple code snippet. Please refer to my GitHub repository for more code including the working iBeacon integration. You can find the whole project on [GitHub](https://github.com/nickrttn/rendezvous). Feel free to fork, change, redistribute.

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
