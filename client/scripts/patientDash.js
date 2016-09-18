Template.patientDash.helpers({
	profileImageUrl: function () {
		return '/resources/images/default-pic.jpg';
	},
	medicineCount: function() {
		return !0? 'No': 0;
	},
	registrationDate: function() {
		return moment().format('MMMM D, YYYY');
	},
	notifications: function() {
		return ([{
			notificationText: 'Dr. Swagman has prescribed u with yoloswag',
			notificationActions: true,
			isRecommendation: true,
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
	}
});