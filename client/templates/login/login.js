Template.login.events({
    'click button': function() {
        Meteor.loginWithGoogle();
    } 
});