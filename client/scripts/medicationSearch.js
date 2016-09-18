Template.medicationSearch.events({
	'click .closeModal': function () {
		Session.set('searchMedications', false);
	}
});