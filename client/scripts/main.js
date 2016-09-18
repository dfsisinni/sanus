Template.signup.events({
	'submit #signup': function (event) {
		event.preventDefault();

		const target = event.target;

		var user = {
			email: target.email.value,
			password: target.password.value,
			profile: {
				name: target.name.value,
				type: target.type.value
			}
		};

		Accounts.createUser(user, function (error) {
			if (error) {
				toastr.error("Unable to create account!");
			} 
		});
	},
});

Template.login.events({
	'submit #login': function (event) {
		event.preventDefault();

		const target = event.target;
		var user = {
			email: target.email.value,
			password: target.password.value
		};

 		Meteor.loginWithPassword(user.email, user.password, function (error, result) {
			if (error) {
				toastr.error("Invalid login credentials!");
			}
		});
	},
});