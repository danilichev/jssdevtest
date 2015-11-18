Template.map.onRendered(function() {
    GoogleMaps.load({libraries: 'geometry'});
});

Template.map.helpers({  
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(35.689, 139.692),
                zoom: 12
            };
        }
    }
});