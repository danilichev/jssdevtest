Meteor.methods({
    foursquareSearch: function (parameters) {
        check(parameters, Object);
        check(parameters.query, String);
        this.unblock();

        var requestParameters = {
            client_id: Meteor.settings.foursquare.clientId,
            client_secret: Meteor.settings.foursquare.secret,
            ll: parameters.lat + ', ' + parameters.lng,
            query: parameters.query,
            radius: parameters.radius,
            limit: 20,
            v: '20140806',
            m: 'foursquare'   
        };
        
        try {
            var result = HTTP.get(
                'https://api.foursquare.com/v2/venues/search',
                {
                    params:  requestParameters,
                    timeout: 20000  
                }  
            );

            return result;

        } catch (error) {
            throw new Meteor.Error("No Result", "Failed to fetch...");   
        }
    }  
});