Meteor.startup(function() {

    ServiceConfiguration.configurations.remove({
       service: 'google'
    });
    
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret
    });
    
});