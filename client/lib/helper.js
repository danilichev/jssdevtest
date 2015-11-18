helper = (function() {
    
    var getQueryRadius = function(map) {
        if (!GoogleMaps.loaded()) return null; 

        var spherical = google.maps.geometry.spherical, 
            bounds = map.getBounds(), 
            center = bounds.getCenter(), 
            norteastCorner = bounds.getNorthEast(); 

        return spherical.computeDistanceBetween(center, norteastCorner);
    }

    var addVenuesOnMap = function(map, venues) {
        var markers = [],
            lastMarker = null,
            infowindow = new google.maps.InfoWindow(),
            bounds = new google.maps.LatLngBounds();

        var showMarkerInfo = function() {
            if (lastMarker) lastMarker.setZIndex(0);
            this.setZIndex(google.maps.Marker.MAX_ZINDEX);
            lastMarker = this;
            
            infowindow.setContent('<p><b>' + this.getTitle() + '</b><br>');
            infowindow.open(map, lastMarker);    
        }

        venues.forEach(function(item) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    item.location.lat, 
                    item.location.lng),
                map: map,
                title: item.name 
            });

            google.maps.event.addListener(marker, 'click', showMarkerInfo);
            
            bounds.extend(marker.getPosition());  
            markers.push(marker);
        }); 

        map.fitBounds(bounds);
        console.log('markers added');

        return markers;
    }

    var removeMarkersFromMap = function(map, markers) {
        markers.forEach(function(item) {
            item.setMap(null);
        });
        console.log('markers removed');
    }

    return {
        getQueryRadius: getQueryRadius,
        addVenuesOnMap: addVenuesOnMap,
        removeMarkersFromMap: removeMarkersFromMap
    }

})();