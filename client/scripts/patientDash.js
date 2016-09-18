Template.patientDash.helpers({
	profileImageUrl: function () {
		return Meteor.user().profile.profileImageUrl || '/resources/images/default-pic.jpg';
	},
	medicineCount: function() {
		return !0? 'No': 0;
	},
	registrationDate: function() {
		return moment(Meteor.user().profile.createdAt).fromNow();
	},
	notifications: function() {
		return ([{
			notificationText: 'Dr. Swagman has prescribed u with yoloswag',
			notificationActions: true,
			isRecommendation: true,
		}]);
	},
	medications: function() {
		return ([{
			"_id": "asdf",
			"name": "Tylenol", },
			{
			"_id": "asdf",
			"name": "Tylenol",},
			{
			"_id": "asdf",
			"name": "Tylenol",},
			{
			"_id": "asdf",
			"name": "Tylenol",
		}]);
	}
});

Template.patientDash.events({
	'click .logout-btn': function () {
		$('body').append('<div id="logoutOver" style="display:block;" class="loadingDiv"></div>');
		Meteor.logout(function() {
			$('#logoutOver').remove();
		});
	},
	'click .showQr': function () {
		$('.qrOverlay').show();
	},
	'click .qrOverlay span': function () {
		$('.qrOverlay').hide();
	},
	'click .selectOnClick': function (e) {
		$(e.target).select();
	},
	'click .add-medication': function () {
		Session.set('searchMedications', true);
	}
});