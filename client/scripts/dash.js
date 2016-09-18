Template.dash.helpers({
	isPatient: function () {
		if (Meteor.user()) {
			return Meteor.user().profile.type === 'patient';
		};
	},
	isDoctor: function () {
		if (Meteor.user()) {
			return Meteor.user().profile.type === 'doctor';
		};
	},
	searchMedications: function () {
		return Session.get('searchMedications');
	}
});