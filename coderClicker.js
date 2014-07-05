if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_ONLY'
    });

  Template.hello.greeting = function () {
    return "Welcome to coderClicker.";
  };

    Meteor.subscribe('userData');

    Template.hello.user = function () {
        return Meteor.user();
    }

  Template.hello.events({
      'click input.code': function () {
          Meteor.call('click');
      }
  });


}

if (Meteor.isServer) {
    Accounts.onCreateUser(
        function(options, user) {
            user.money = 0;
            user.rate = 0;
            return user;
    })

  Meteor.startup(function () {
    // code to run on server at startup
      Meteor.publish("userData", function () {
          return Meteor.users.find({}, {sort: {'money': -1}});
      });
  });
}

Meteor.methods({
    click: function () {
        Meteor.users.update({_id: this.userId}, {$inc: {'money': 25}});
    }
})