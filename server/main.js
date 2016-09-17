import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Drugs = new Mongo.Collection('drugs');
const userInfo = new Mongo.Collection('userInfo');
const Allergens = new Mongo.Collection('allergens');


Meteor.startup(() => {
	smtp = {
		username: 'welcome@sanus.me',
		password: 'welcomeme',
		server:   'smtp.mailgun.org',
		port: 587
	}

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


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

	Accounts.emailTemplates.siteName = "AwesomeSite";
	Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>"
	Accounts.emailTemplates.verifyEmail.text = function(user, url) {
		console.log('here');
		return 'Thank you for registering!  Please click on the following link to verify your email address: \r\n' + url;
	};

	

});

Accounts.onCreateUser(function(options, user) {
	check(options.profile.name, String);
	check(options.profile.type, String);

	var userNumber = (Math.random() * 1000000);
	while(Meteor.users.findOne({"profile.userNumber": userNumber})) {
		userNumber = (Math.random() * 1000000);
	};

	user.profile =  options.profile;
	user.profile.userNumber = userNumber;


	 Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

	return user;
});


Accounts.config({
	sendVerificationEmail: true
});