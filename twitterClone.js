Tweets = new Meteor.Collection('tweets');

if (Meteor.isClient) {
  Template.tweetBox.onRendered(function () {
    Session.set('numChars', 0)
  });

  Template.tweetBox.events({
    'input #tweetText': function() {
      Session.set('numChars', $('#tweetText').val().length);
    },

    'click button': function() {
      var tweet = $('#tweetText').val();
      $('#tweetText').val('');
      Session.set('numChars', 0);
      Tweets.insert({message: tweet});
    }
  });

  Template.userManagement.events({
    'click #signup': function() {
      var user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        profile: {
          fullname: $('signup-fullname').val()
        }
      };

      Accounts.createUser(user, function(error) {
        if (error) {
          alert(error);
        }
      });
    },

    'click #login': function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if (error) {
          alert(error);
        }
      });
    }
  });

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
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
