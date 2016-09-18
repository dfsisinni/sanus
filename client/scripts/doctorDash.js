

Template.doctorDash.rendered = function () {
	Session.set("patientNumber", null);
};

Template.doctorDash.helpers({
	profileImageUrl: function () {
		return '/resources/images/default-pic.jpg';
	},

	registrationDate: function() {
		return moment().format('MMMM D, YYYY');
	},

	patientView: function () {
		return Session.get("patientNumber") != null;
	}
});

Template.doctorDash.events({
	'submit .lookup-form': function (event) {
		event.preventDefault();

		const target = event.target;
		var userNumber = target.patientLookup.value;


		if (Meteor.users.find({"profile.userNumber": parseFloat(userNumber)}).count() > 0) {
			Session.set("patientNumber", userNumber);
		} else {
			Session.set("patientNumber", null);
		}
	},
});