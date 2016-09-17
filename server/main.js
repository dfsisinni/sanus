import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Drugs = new Mongo.Collection('drugs');
const userInfo = new Mongo.Collection('userInfo');


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
});
