Template.signup.events({
	'submit #signup': function (event) {
		event.preventDefault();

		const target = event.target;
		console.log(target);

		var user = {
			name: target.name.value,
			email: target.email.value,
			password: target.password.value
		};

		Meteor.call('registerUser', user, function (error, result) {

			console.log(error);

			if (error) {
				toastr.error("Unable to create account!");
			} else {
				toastr.success("Account created!");
			}
		});
	},
})