

Template.doctorDash.created = function () {
	Session.set("patientNumber", false);
};

Template.doctorDash.helpers({
	profileImageUrl: function () {
		return '/resources/images/default-pic.jpg';
	},

	registrationDate: function() {
		return moment().format('MMMM D, YYYY');
	},

	patientNumber: function () {
		return Session.get("patientNumber");
	},

	
});

Template.patient.helpers({
	patientData: function () {
		if (Session.get("patientNumber") == false) {
			return null;
		} else {
			console.log(Meteor.users.find({"profile.userNumber" : parseInt(Session.get("patientNumber"))}).fetch()[0].profile);
			return Meteor.users.find({"profile.userNumber" : parseInt(Session.get("patientNumber"))}).fetch()[0].profile;
		}
	}
});

Template.doctorDash.events({
	'submit .lookup-form': function (event) {
		event.preventDefault();

		const target = event.target;
		var userNumber = target.patientLookup.value;


		if (Meteor.users.find({"profile.userNumber": parseInt(userNumber)}).count() > 0) {
			Session.set("patientNumber", parseInt(userNumber));
		} else {
			Session.set("patientNumber", false);
		}
	},
	'click .logout-btn': function () {
		$('body').append('<div id="logoutOver" style="display:block;" class="loadingDiv"></div>');
		Meteor.logout(function() {
			$('#logoutOver').remove();
		});
	},

	'click .add-medication': function () {
		Session.set("searchMedications", true);
	},
});