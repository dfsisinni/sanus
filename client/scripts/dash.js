Template.dash.helpers({
	isPatient: function () {
		if (Meteor.user()) {
			return Meteor.user().profile.type === 'patient';			
		};
	}
});