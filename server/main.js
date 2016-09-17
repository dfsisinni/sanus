import { Meteor } from 'meteor/meteor';
const Drugs = new Mongo.Collection('drugs');


Meteor.startup(() => {
  importDrugs();
});

var importDrugs = function () {
	var fs = require('fs');
}
