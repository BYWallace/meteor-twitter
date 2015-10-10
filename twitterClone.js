if (Meteor.isClient) {

  Template.tweetBox.onRendered(function () {
    Session.set('numChars', 0)
  });

  Template.tweetBox.events({
    'input #tweetText': function() {
      Session.set('numChars', $('#tweetText').val().length);
    }
  })

  Template.tweetBox.helpers({
    charCount: function() {
      return 140 - Session.get('numChars');
    },

    charClass: function() {
      if (Session.get('numChars') > 140) {
        return 'errCharCount';
      } else {
        return 'charCount';
      }
    },

    disableButton: function() {
      if (Session.get('numChars') <= 0 || Session.get('numChars') > 140) {
        return 'disabled';
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
