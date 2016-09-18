Template.medicationSearch.created = function () {
	Session.set("query", "");
	Session.set("searchResults", null);
	Session.set("loading", false);
};

Template.medicationSearch.events({
	'click .closeModal': function () {
		Session.set('searchMedications', false);
	},
	'click .search-btn': function () {
		var value = document.getElementById('searchMedications').value;
		
		Session.set("query", value);

		Session.set("loading", true);

		try {
		Meteor.call('getDrugList', value, function (error, data) {
			
			var content = data.content;

				content = content.substr(content.indexOf('(') + 1, content.length - 1);
				content = content.substr(0, content.lastIndexOf(')') -1);

				var types = JSON.parse(content).types;
				if (types.length == 0) {
					Session.set("loading", false);
				} else {
					var ref = types[0].references;
					Session.set("loading", false);
					Session.set("searchResults", ref);	
				}

			
			
		});

		} catch (err) {
			Session.set("loading", false);
		}  
	},
	'keydown #searchMedications': function (e) {
		if (e.keyCode === 13) {
			var value = e.target.value;
		
			Session.set("query", value);

			Session.set("loading", true);

			try {
			Meteor.call('getDrugList', value, function (error, data) {
				var content = data.content;

				
					content = content.substr(content.indexOf('(') + 1, content.length - 1);
					content = content.substr(0, content.lastIndexOf(')') -1);

					var types = JSON.parse(content).types;
				if (types.length == 0) {
					Session.set("loading", false);
				} else {
					var ref = types[0].references;
					Session.set("loading", false);
					Session.set("searchResults", ref);	
				}

				
			});

			} catch (err) {
				Session.set("loading", false);
			}
		};
	},
});

Template.medicationSearch.helpers({
	searchResults: function () {
		return Session.get("searchResults");
	},

	loading: function () {
		return Session.get("loading");
	},
});

Template.searchResult.events({
	'click .search-result-item': function (e) {
		e.preventDefault();
		Session.set('mountedSearchResult', this);
		Session.set('latestQuery', $('#searchMedications').val());
		Router.go('/search-result');
	}
});