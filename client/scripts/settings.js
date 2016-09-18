Template.settings.helpers({
	profileImageUrl: function () {
		if (Meteor.user()) {
			return Meteor.user().profile.profileImageUrl || '/resources/images/default-pic.jpg';
		};
	},
	currentEmail: function () {
		return Meteor.user() && Meteor.user().emails.length && Meteor.user().emails[0].address;
	},
	allergies: function () {
		return ["lactose", "milk", "eggs", "wheat", "gluten", "fish", "soy", "peanuts", "shellfish", "peaches", "plums", "cherries", "apricots", "grapefruits", "nuts", "seeds"].map(function(allergy) {
			return {allergy: allergy};
		});
	},
	isAllergy: function() {
		if (Meteor.user()) {
			return Array.isArray(Meteor.user().profile.allergies) && Meteor.user().profile.allergies.indexOf(this.allergy) !== -1;
		};
	},
	isPatient: function() {
		return Meteor.user() && Meteor.user().profile.type === 'patient';
	}
});

Template.settings.events({
	'submit #settingsForm': function (e) {
		e.preventDefault();
		$('*').blur();
		var changeCount = 0;
		function onComplete() {
			if (!changeCount) {
				alert('Details saved!');
			};
		}

		var name = e.target.nameInput.value;

		if (name.length && name !== Meteor.user().profile.name) {
			changeCount ++;
			Meteor.call('changeName', name, function (err) {
				changeCount --;
				onComplete();
				if (err) {
					return alert(err.error);
				};
			});
		};

		var email = e.target.emailInput.value;

		if (email.length && email !== Meteor.user().emails[0].address) {
			changeCount ++;
			Meteor.call("changeEmail", email, function(err){
				changeCount --;
				onComplete();
				if(err) {
					return alert(err.error);
				}
			});
		};


		var password = e.target.passwordInput.value;
		if (password && password.length) {
			var oldPassword = e.target.passwordOldInput.value;
			if (oldPassword && oldPassword.length) {
				changeCount ++;
				Accounts.changePassword(oldPassword, password, function(err){
					changeCount --;
					onComplete();
					if(err){
						alert('Could not change password');
						return false;
					};
					$('input[type="password"]').val('');
				});
			} else {
				alert('Please enter your current password to set a new one.');
				return false;
			};
			// Meteor.call('checkPassword', CryptoJS.SHA256(passwordVerify).toString(), function(err, result) {
			// 	if(result){

			// 	}
			// });
		};

		var allergies = [];
			$('input[name="allergiesInput"]:checked').each(function(index, el) {allergies.push(el.value)});
		if (allergies !== Meteor.user().profile.allergies) {
			changeCount++;
			Meteor.call('changeAllergies', allergies, function (err) {
				changeCount --;
				onComplete();
				if(err){
					alert('Could not update allergies');
					return false;
				};
			});
		};
	},
	'change input#profileImage': function (e) {
		FS.Utility.eachFile(e, function(file) {
	    	Images.insert(file, function (err, fileObj) {
		        if (err){
		           alert("Could not upload file.\nSee console for details or try again.");
					 console.log(err);
					 		
		        } else {
		        	var fileId =  fileObj._id;
		        	Meteor.call('updateUserProfileProperty', fileId, function(err) {
		        		if (err) {
		        			alert('Could not update profile picture.\nSee console for details or try again later.');
		        			console.log(err);
		        		} else {
		        			alert('Profile picture updated!');
		        			var count = 0;
		        			var forceImage = setInterval(function() {
		        				if (count === 3) {
		        					clearInterval(forceImage);
		        					window.reload();
		        				};
		        				$('.current-image').css('background-image', 'url()');
		        				setTimeout(function() {
		        					$('.current-image').css('background-image', 'url(\''+Meteor.user().profile.profileImageUrl+'\')');
		        				}, 500);
		        				count++;
		        			}, 600);
		        		}
		        	});
		        }
		    });
		});
		$(e.currentTarget).val('');
	}
});