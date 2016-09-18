Template.medicineView.events({
	'click #deleteMedicine': function(e) {
		if(confirm('Are you sure you want to delete this?')){
		  Meteor.call('removeMedication', Router.current().params.medId, function (e) {
		  	if (e) {
		  		return alert(e.reason);
		  	};
		  	Router.go('/');
		  });
		}
	}
});

Template.medicineView.helpers({
	medicine: function () {
		if (Meteor.user()) {
			var medicine = Meteor.user().profile.medications.find(function(med) {
				return med._id === Router.current().params.medId;
			});
			Session.set('medicineMount', medicine);
			return medicine;
		};
	},
	startDateFormatted: function() {
		if (!Meteor.user()) {return};
		return moment(Session.get('medicineMount').startDate).format('MMMM do, YYYY');
	},
	endDateFormatted: function() {
		if (!Meteor.user()) {return};
		return moment(Session.get('medicineMount').endDate).format('MMMM do, YYYY');
	},
	conflictText: function() {
		return '';
	},
	conflicts: function() {
		if (!Meteor.user()) {return};
		var conflicDets = Session.get('medicineMount').conflictDetails;
		return conflicDets && ((conflicDets.conflictsWith && conflicDets.conflictsWith.length) || (conflicDets.reactsWith && conflicDets.reactsWith.length))
	}
});

Template.medicineView.destroyed = function () {
	Session.set('medicineMount', null);
};