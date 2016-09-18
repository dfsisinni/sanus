Template.medicationSearch.created = function () {
	Session.set("searchResults", null);
	Session.set("loading", false);
};

Template.medicationSearch.events({
	'click .closeModal': function () {
		Session.set('searchMedications', false);
	},

	'click .search-btn': function (event) {
		var value = document.getElementById('searchMedications').value;
		

		Session.set("loading", true);
		Meteor.call('getDrugList', value, function (error, data) {
			var content = data.content;
			content = content.substr(content.indexOf('(') + 1, content.length - 1);
			content = content.substr(0, content.lastIndexOf(')') -1);

			var ref = JSON.parse(content).types[0].references;
			Session.set("loading", false);
			Session.set("searchResults", ref);	
		});
	}
});

Template.medicationSearch.helpers({
	searchResults: function () {
		return Session.get("searchResults");
	},

	loading: function () {
		return Session.get("lodaing");
	},
});