Template.guide.onCreated(function() {
    this.subscribe('requests');

    this.venues = new ReactiveVar(null);
    this.markers = new ReactiveVar(null);
    this.query = new ReactiveVar('default');

    Session.set('isMapReady', false);
    Session.set('requestParameters', null);

    GoogleMaps.ready('map', function(map) {
        Session.set('isMapReady', true)
    });
});

Template.guide.helpers({
    'getRequests': function() {
        return Requests.find({});
    },
    'isMapReady': function() {
        return Session.get('isMapReady');
    },
    'getVenues': function() {
        var venues = Template.instance().venues,
            markers = Template.instance().markers,
            map = GoogleMaps.maps.map.instance;

        if (venues.get() && !markers.get()) {    
            markers.set(helper.addVenuesOnMap(map, venues.get()));
        } else if (!venues.get() && markers.get()) {
            helper.removeMarkersFromMap(map, markers.get());
            markers.set(null);
        }

        return venues.get();
    },
    'getRequestParameters': function() {
        var template = Template.instance(),
            venues = template.venues,
            reqParam = Session.get('requestParameters');
        
        if (reqParam) {
            Session.set('requestParameters', null);
            venues.set(null);

            Meteor.call('foursquareSearch', reqParam, function(error, result) {
                if (result.data) {
                    venues.set(result.data.response.venues);
                    template.$('#searchInput').val(reqParam.query);
                }
            });
        }
 
        return reqParam;
    },
    'isSearchInputEmpty': function() {
        var template = Template.instance(),
            query = template.query.get(),
            inputGroup = template.$('#search'),
            searchButton = template.$('#searchButton'),
            message = '';

        if (!query) {
            inputGroup.addClass('has-error');
            searchButton.addClass('disabled');
            message = 'Please, fill search field';
        } else {
            inputGroup.removeClass('has-error');
            searchButton.removeClass('disabled');   
        }

        return message;
    }
});

Template.guide.events({
    'keyup #searchInput': function(event, template) {
        event.preventDefault();
        template.query.set($(event.target).val());
    },
    'submit #searchForm, click #searchButton': function(event, template) {
        event.preventDefault();

        if (!template.query.get() || template.query.get() === 'default') return;

        var map = GoogleMaps.maps.map.instance,
            reqParam = {
                lat: map.getCenter().lat(),
                lng: map.getCenter().lng(),
                query: template.query.get(),
                radius: Math.floor(helper.getQueryRadius(map))
            };

        Requests.insert({
            owner: Meteor.userId(),
            parameters: reqParam,
            date: new Date()
        });

        Session.set('requestParameters', reqParam);
    }
});