Template.patientDash.helpers({
	profileImageUrl: function () {
		return '/resources/images/default-pic.jpg';
	},
	medicineCount: function() {
		return !0? 'No': 0;
	},
	registrationDate: function() {
		return moment().format('MMMM D, YYYY');
	}
});

Template.patientDash.events({
	'click .logout-btn': function () {
		$('body').append('<div id="logoutOver" style="display:block;" class="loadingDiv"></div>');
		Meteor.logout(function() {
			$('#logoutOver').remove();
		});
	}
});