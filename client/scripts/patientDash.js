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
		return Meteor.user() && Meteor.user().profile.recommendations;
	},
	medications: function() {
		return Meteor.user() && Meteor.user().profile.medications;
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
	},
	'click .remove-med': function(e) {
		var $thisId = $(e.currentTarget).attr('data-id');
		if(confirm('Are you sure you want to delete '+this.name+'?')){
		  Meteor.call('removeMedication', $thisId, function (e) {
		  	if (e) {
		  		return alert(e.reason);
		  	};
		  });
		}
	}
});

Template.notification.events({
	'click .accept': function () {
		var $thisId = this._id;
		if(confirm('Are you sure you want to delete '+this.name+'?')){
		  Meteor.call('confirmRecommendation', $thisId, function (e) {
		  	if (e) {
		  		return alert(e.reason);
		  	};
		  });
		}
	},
	'click .reject': function () {
		var $thisId = this._id;
		if(confirm('Are you sure you want to delete '+this.name+'?')){
		  Meteor.call('removeRecommendation', $thisId, function (e) {
		  	if (e) {
		  		return alert(e.reason);
		  	};
		  });
		}
	},
});