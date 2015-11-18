Template.requestItem.helpers({
    'getFormattedDate': function(date) {
        return moment(date).format('MMM D HH:mm');
    }
});

Template.requestItem.events({
    'click #removeRequestButton': function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var requestId = this._id;
        Requests.remove({_id: requestId}, function(error) {
            if (error) {
                console.log('Remove request failed... ' + error);
                return;
            }
            console.log('Request deleted.');
        });
    },
    'click .requestItem': function(event, template) {
        Session.set('requestParameters', this.parameters);   
    }
});