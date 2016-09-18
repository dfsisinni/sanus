Template.doctorDash.helpers({
	profileImageUrl: function () {
		return '/resources/images/default-pic.jpg';
	},

	registrationDate: function() {
		return moment().format('MMMM D, YYYY');
	},
});