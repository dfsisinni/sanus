Meteor.startup(function () {
	Meteor.methods({
		removeMedication: function (medId) {
			var userMeds = Meteor.user().profile.medications;
			var indexToRemoveAt = -1;
			userMeds.find(function(med, i) {
				if (med._id === medId) {
					indexToRemoveAt = i;
					return true;
				};
			});
			if (indexToRemoveAt !== -1) {
				userMeds.splice(indexToRemoveAt, 1);
				Meteor.users.update({"_id": Meteor.userId()}, {$set: {"profile.medications": userMeds}})
			};
		},
		removeRecommendation: function (medId) {
			var userRecommends = Meteor.user().profile.recommendations;
			var indexToRemoveAt = -1;
			userRecommends.find(function(med, i) {
				if (med._id === medId) {
					indexToRemoveAt = i;
					return true;
				};
			});
			if (indexToRemoveAt !== -1) {
				userRecommends.splice(indexToRemoveAt, 1);
				Meteor.users.update({"_id": Meteor.userId()}, {$set: {"profile.recommendations": userRecommends}})
			};
		},
		confirmRecommendation: function (medId) {
			var userRecommends = Meteor.user().profile.recommendations;
			var userMeds = Meteor.user().profile.medications || [];
			var indexToRemoveAt = -1, recommendation = userRecommends.find(function(med, i) {
				if (med._id === medId) {
					indexToRemoveAt = i;
					return true;
				};
			});
			if (indexToRemoveAt !== -1) {
				userMeds.push(recommendation);
				userRecommends.splice(indexToRemoveAt, 1);
				Meteor.users.update({"_id": Meteor.userId()}, {$set: {"profile.recommendations": userRecommends, "profile.medications": userMeds}});
			};
		},
		addMedication: function (data) {
			var medicineObj = {};

			medicineObj._id = Random.id();
			medicineObj.apiId = data.other.id;
			medicineObj.name = data.other.text;
			medicineObj.searchQuery = data.queryUsed;
			medicineObj.conflictDetails = {
				conflictsWith: [],
				reactsWith: data.conflictData.allergies,
			};
			medicineObj.conflictDetails.conflictsWith = data.conflictData.medicationConflicts.map(function(med) {
				var drug = med.drug1.id === data.other.id? med.drug2 : med.drug1;
				return {
					id: drug.id,
					name: drug.name,
					message: med.message,
					severity: med.severity,
				}
			});


			if (Meteor.user().profile.type === 'patient') {
				var medList = Meteor.user().profile.medications || [];
				medList.push(medicineObj);
				Meteor.users.update({"_id": Meteor.userId()}, {"profile.medications": medList});
			} else {
				var recList = Meteor.users.findOne({"profile.userNumber": data.patientNumber});
				if (recList) {
					recList = recList.profile.recommendations || [];
					recList.push(medicineObj);
					Meteor.users.update({"profile.userNumber": data.patientNumber}, {"profile.recommendations": recList});
				};
			};
		},

		updateMedicine: function(data) {
			if (Meteor.user().profile.type === 'patient') {
				var idx = -1;
				var medList = Meteor.user().profile.medications;
				var medicine = medList.find(function(g, index) {
					if(g._id === data.id) {
						idx = index;
						return true;
					};
				});
				if (idx !== -1) {
					medicine.startDate = data.startDate;
					medicine.endDate = data.endDate;
					medicine.directions = data.directions;
					medList[idx] = medicine;
					Meteor.users.update({"_id": Meteor.userId()}, {"profile.medications": medList});
				};
			} else {
				var idx = -1;
				var user = Meteor.users.findOne({"profile.userNumber": data.patientNumber});
				var recList = user.profile.medications;
				var medicine = recList.find(function(g, index) {
					if(g._id === data.id) {
						idx = index;
						return true;
					};
				});
				if (idx !== -1) {
					medicine.startDate = data.startDate;
					medicine.endDate = data.endDate;
					medicine.directions = data.directions;
					recList[idx] = medicine;
					Meteor.users.update({"profile.userNumber": data.patientNumber}, {"profile.recommendations": recList});
				};
			};
		}
	});
});