Template.reset.events({
	'submit form[name="passwordResetInit"]': function (e) {
		e.preventDefault();
		var $e = e;
		Accounts.forgotPassword({email: e.target.emailInput.value}, function(e) {
			if (e) {
				$($e.target.emailInput).select();
				return alert(e.reason);
			}
			else{
				$e.target.emailInput.value = "";
				alert('Success!\nWe\'ve sent you a password reset link in your email.');
				return Router.go('/');
			};
		});
	}
});

Template.resetComplete.events({
	'submit form[name="passwordResetComplete"]': function (e) {
		e.preventDefault();
		if (e.target.passwordTwo.value !== e.target.passwordOne.value) {
			return alert('The passwords do not match.');
		}
		else{
			Accounts.resetPassword(Session.get('resetPassword'), e.target.passwordOne, function (err) {
				if (err) {
					return alert(err.reason);
				}
				else{
					Session.set('resetPassword', null);
					alert('Success!\nPassword has been reset.');
					return Router.go('/');
				};
			});
		};
	}
});