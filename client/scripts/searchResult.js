Template.searchResultLanding.helpers({
	medicine: function () {
		return Session.get('mountedSearchResult');
	},
	conflicts: function () {
		var conflicts = Session.get('searchSelectionHasConflict');
		var respId = Session.get('mountedSearchResult').id;
		if (conflicts) {
			var ToRet = {};
			ToRet.text = "Conflicts with <b>" + conflicts.medicationConflicts.map(function (conflict) {
				var conflicter = conflict.drug1.id === respId? conflict.drug2.name: conflict.drug1.name;
				return conflicter;
			}).join(", ") + ".</b> <br /> Has allergic reactions to <b>" + conflicts.allergies.join(", ") + "</b>";
		};
	}
});

Template.searchResultLanding.destroyed = function () {
	Session.set('searchSelectionHasConflict', undefined);
};

Template.searchResultLanding.created = function () {
	var resp = Session.get('mountedSearchResult');
	Meteor.call('getConflicts', {
		webmd: resp.id,
		name: resp.text,
		query: Session.get('latestQuery')
	}, function (err, res) {
		if (res) {
			Session.set('searchSelectionHasConflict', res);
		};
	});
};