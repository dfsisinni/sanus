Meteor.startup(function () {
	Meteor.methods({
		updateUserProfileProperty: function (fileId) {
			if (typeof fileId === 'string') {
				var imageUrl = "/cfs/files/images/" + fileId;
				Meteor.users.update({'_id': Meteor.userId()}, {$set: {"profile.profileImageUrl": imageUrl}});
			};
		}
	});
});