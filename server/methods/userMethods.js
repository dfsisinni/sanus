Meteor.methods({
	'registerUser' (user) {

		check(user.name, String);
		check(user.email, String);
		check(user.password, String);

		Accounts.createUser({
			email: user.email,
			password: user.password
		});

		userInfo.insert({
			id: Meteor.userId(),
			name: user.name
		});


	},

	'getDrugList' (query) {
		console.log(query);
		var result = Meteor.http.call("POSt", "http://www.webmd.com/api/qrl/LookupService.ashx?jsonp=jQuery18204622211846722426_1473889064854&format=json&metadata=rxotc%2Cgeneric_name%2Cmnid&q=" + query + "&s=3&sz=125&_=1473889942505");
		return result;
	},
});