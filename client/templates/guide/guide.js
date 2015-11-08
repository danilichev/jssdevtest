Template.guide.events({
    'click #searchButton': function(event, template) {
        event.preventDefault();
        
        var requestParameters = {
            query: 'bus station'
        }

        Meteor.call('foursquareSearch', requestParameters, function(error, result) {
            console.log(result);
        });

        alert('ok!');
    }
});