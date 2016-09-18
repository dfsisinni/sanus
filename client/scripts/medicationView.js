Template.medicineView.events({
	'click #deleteMedicine': function(e) {
		if(confirm('Are you sure you want to delete this?')){
		  Meteor.call('removeMedication', Router.current().params.medId, function (e) {
		  	if (e) {
		  		return alert(e.reason);
		  	};
		  });
		}
	}
});