Template.login.events({
    'click .btn-google': function() {
        Meteor.loginWithGoogle();
    } 
});