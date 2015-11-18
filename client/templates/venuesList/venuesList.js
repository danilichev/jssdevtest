Template.venuesList.helpers({
    'venuesNumber': function() {
        var length = Template.currentData().venues.length;
        return length === 1 ? length + ' venue' : length + ' venues';
    }
});

Template.venuesList.events({
    'click #exportButton': function(event) {
        var nameFile = 'venues.csv',
            venues = Template.currentData().venues,
            csv = '',
            blob;

        venues.forEach(function(item) {
            csv = csv + 
            item.name + ', ' +
            item.location.city + ', ' +
            item.location.address + ', ' +
            item.location.lat + ', ' +
            item.location.lng + '\n'; 
        });

        window.open("data:text/csv;charset=utf-8," + escape(csv));
    }
})