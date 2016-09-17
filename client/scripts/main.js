Template.signup.events({
	'submit #signup': function (event) {
		event.preventDefault();

		const target = event.target;

		var user = {
			name: target.name.value,
			email: target.email.value,
			password: target.password.value
		};

		Meteor.call('registerUser', user, function (error, result) {
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

		Meteor.loginWithPassword (user.email, user.password, function (error, result) {
			if (error) {
				toastr.error("Invalid login credentials!");
			}
		});
	},
});