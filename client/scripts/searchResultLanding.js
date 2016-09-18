Template.searchResultLanding.helpers({
	medicine: function () {
		return Session.get('mountedSearchResult');
	},
	conflicts: function () {
		var conflicts = Session.get('searchSelectionHasConflict');
		var respId = Session.get('mountedSearchResult').id;
		if (conflicts && conflicts.medicationConflicts) {
			var ToRet = {};
			ToRet.text = "Conflicts with <b>" + conflicts.medicationConflicts.map(function (conflict) {
				var conflicter = conflict.drug1.id === respId? conflict.drug2.name: conflict.drug1.name;
				return conflicter;
			}).join(", ") + ".</b> <br /> Has allergic reactions to <b>" + conflicts.allergies.join(", ") + "</b>";
		};
	}
});

Template.searchResultLanding.events({
	'click #addToMedicines': function () {
		Meteor.call('addMedication', {
			conflictData: Session.get('searchSelectionHasConflict'),
			other: Session.get('mountedSearchResult'),
			patientNumber: Session.get('patientNumber'),
			queryUsed: Session.get('latestQuery'),
		}, function (e, r) {
			if (e) {
				return alert(e.message);
			};
			Router.go('/med/' + r + '/edit');
		});
	}
});

Template.searchResultLanding.destroyed = function () {
	Session.set('searchSelectionHasConflict', undefined);
};

Template.searchResultLanding.created = function () {
	var resp = Session.get('mountedSearchResult');
	if (resp) {
		var data = {
			wedmd: resp.id,
			name: resp.text,
			query: Session.get('latestQuery')
		};
		Meteor.call('getConflicts', {
			data
		}, function (err, res) {
			if (res) {
				Session.set('searchSelectionHasConflict', res);
			};
		});
	};
};