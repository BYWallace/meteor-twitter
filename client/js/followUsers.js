Template.followUsers.events({
  'submit form': function(event) {
    var searchUser = event.target.searchUser.value();
    var foundUsers = Meteor.call('findUser', searchUser, function(err, res) {
      if (res) {
        Session.set('foundUser', res);
      }
    });
    return false;
  }
});
