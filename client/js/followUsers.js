Template.followUsers.onRendered(function() {
  Meteor.call('recommendUsers', function(err, res) {
    Session.set('recommendedUsers', res);
  })
})

Template.followUsers.helpers({
  'foundUser': function() {
    return Session.get('foundUser');
  },

  'recommendedUsers': function() {
    return Session.get('recommendedUsers');
  }
});

Template.followUsers.events({
  'submit form': function(event) {
    var searchUser = event.target.searchUser.value;
    var foundUsers = Meteor.call('findUser', searchUser, function(err, res) {
      if (res) {
        Session.set('foundUser', res);
      }
    });
    return false;
  },

  'click #follow': function() {
    Meteor.call('followUser', Session.get('foundUser').username);
  },

  'click #followRec': function(e) {
    Meteor.call('followUser', this.username);
  }
});
