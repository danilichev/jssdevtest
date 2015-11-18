Meteor.publish('requests', function(){
    var currentUserId = this.userId;
    return Requests.find({owner: currentUserId}, {sort: {date: 1}});
});