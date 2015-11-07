Template.header.events({
    'click #logOutButton': function(event) {
        event.preventDefault();
        Meteor.logout();
    }
});