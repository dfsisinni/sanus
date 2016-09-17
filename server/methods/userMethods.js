Meteor.methods({
	'registerUser' (user) {
		check(user.email, String);
		check(user.password, String);
		check(user.profile.name, String);
		check(user.profile.type, String);

		Accounts.createUser({
			email: user.email,
			password: user.password
		});
	},

	'getDrugList' (query) {
		console.log(query);
		var result = Meteor.http.call("POSt", "http://www.webmd.com/api/qrl/LookupService.ashx?jsonp=jQuery18204622211846722426_1473889064854&format=json&metadata=rxotc%2Cgeneric_name%2Cmnid&q=" + query + "&s=3&sz=125&_=1473889942505");
		return result;
	},
});