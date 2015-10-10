Template.followUsers.helpers({
  'foundUser': function() {
    return Session.get('foundUser');
  }
});

Template.followUsers.events({
  'submit form': function(event) {
    var searchUser = event.target.searchUser.value();
    var foundUsers = Meteor.call('findUser', searchUser, function(err, res) {
      if (res) {
        Session.set('foundUser', res);
      }
    });
    return false;
  },

  'click #follow': function() {
    Meteor.call('followUser', Session.get('foundUser').username);
  }
});
