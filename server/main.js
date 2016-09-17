import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Drugs = new Mongo.Collection('drugs');
const userInfo = new Mongo.Collection('userInfo');
const Allergens = new Mongo.Collection('allergens');


Meteor.startup(() => {
  	var fs = require('fs');
	var path = require('path');
	var fileName = process.env.PWD + path.join(__dirname, 'drugs.json');


	fs.readFile(fileName, {encoding: 'utf-8'}, Meteor.bindEnvironment(function(err,data){
		var obj = JSON.parse(data);
		
		Drugs.remove({});
		for (var i = 0; i < obj.length; i++) {
			Drugs.insert({
				id: obj[i].id,
				name: obj[i].name
			});
		}
	}));

	fileName = process.env.PWD + path.join(__dirname, 'allergens.json');
	fs.readFile(fileName, {encoding: 'utf-8'}, Meteor.bindEnvironment(function (err, data) {
		var obj = JSON.parse(data);

		Allergens.remove({});
		for (var i = 0; i < obj.length; i++) {
			Allergens.insert({
				name: obj[i]
			});
		}
	}));
});

Accounts.onCreateUser(function(options, user) {
	var userNumber = (Math.random() * 1000000);
	while(Meteor.users.findOne({"profile.userNumber": userNumber})) {
		userNumber = (Math.random() * 1000000);
	};

	user.profile = { userNumber };
});

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
