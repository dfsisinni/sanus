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
	'submit #login': function (event) 
{		event.preventDefault();

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


		/*Meteor.call('getDrugList', 'tylenol', function (error, data) {
			var content = data.content;
			content = content.substr(content.indexOf('(') + 1, content.length - 1);
			content = content.substr(0, content.lastIndexOf(')') -1);

			console.log(JSON.parse(content).types[0].references);		
		});*/
	},
});