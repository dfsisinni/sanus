var Future = Npm.require( 'fibers/future' ); 

Meteor.methods({
	'getDrugList' (query) {
		var result = Meteor.http.call("POSt", "http://www.webmd.com/api/qrl/LookupService.ashx?jsonp=jQuery18204622211846722426_1473889064854&format=json&metadata=rxotc%2Cgeneric_name%2Cmnid&q=" + query + "&s=3&sz=125&_=1473889942505");
		return result;
	},

	'getConflicts' (stuff) {
		//WEBMD CHECKS

		console.log(stuff);

		var webmd = stuff.data.wedmd;
		var name = stuff.data.name;
		var query = stuff.data.query;

		var data = {
			"DrugType": "FDB",
			"MaxSecurityLevel": 4,
			"MinSecurityLevel": 0,
			"MetaInfoType": "Consumer"
		};

		var response = {};

		var webmdIds = [];
		console.log(webmd);
		webmdIds[0] = webmd;
		var meds = Meteor.user().profile.medications;

		if (meds != null) {
			for (var i = 1; i <= meds.length; i++) {
			webmdIds[i] = meds[i-1].apiId;
		}

		console.log('here');

		data.DrugIds = webmdIds.slice();

		if (data.DrugIds.length > 0) {
			console.log(JSON.stringify(data));

			var future = new Future();
			Meteor.http.call("POST", "http://www.webmd.com/drugs/api/DrugInteractionChecker.svc/drugsinteraction", {"data": data}, function (error, result) {
				future.return(result.data);
			});
			future.wait();
			console.log(future.value.data);
			var data = future.value.data;
			var medicationConflicts = [];
			for (var i = 0; i < data.length; i++) {
				var drug1 = {
					id: data[i].Object.VendorID,
					name: data[i].Object.Name
				};

				var drug2 = {
					id: data[i].Subject.VendorID,
					name: data[i].Subject.Name
				};

				if (drug1.id != webmd && drug2.id != webmd) {
					continue;
				}
				console.log(data[i].MetaInfo);
				var severity = data[i].MetaInfo[0].Severity;
				severity = severity.toLowerCase();

				//severity variable
				if (severity.includes("significant")) {
					severity = "significant";
				} else if (severity.includes("moderate")) {
					severity = "moderate";
				} else if (severity.includes("minor")) {
					severity = "minor";
				}

				var message = data[i].Subject.Name + data[i].MetaInfo[0].DirectionalityEffect1 + data[i].Object.name + data[i].MetaInfo[0].DirectionalityEffect2 + data[i].MetaInfo[0].Mechanism;

				var conflict = {
					"drug1": drug1,
					"drug2": drug2,
					"severity": severity,
					"message": message
				};

				medicationConflicts.push(conflict);

			}

			response.medicationConflicts = medicationConflicts.slice();

		}
		}

		
		name = encodeURIComponent(name);
		query = encodeURIComponent(query);

		var allergies = [];

		var allAllergies = Meteor.user().profile.allergies;
		for (var i = 0; i < allAllergies.length; i++) {
			var result = Meteor.http.call("POSt", "https://api.fda.gov/drug/label.json?search=generic_name:[" + name + "+TO+" + name + "]+AND+inactive_ingredient:" +  encodeURIComponent(allAllergies[i]) + "&limit=1");
			var obj = JSON.parse(result);
			if (obj.results.total == 0) {
				var result = Meteor.http.call("POSt", "https://api.fda.gov/drug/label.json?search=generic_name:[" + query + "+TO+" + query + "]+AND+inactive_ingredient:" +  encodeURIComponent(allAllergies[i]) + "&limit=1");
				obj = JSON.parse(result);
				if (obj.results.total == 0) {
					continue;
				}
			} else {
				allergies.push(allAllergies[i]);
			}
		}

		response.allergies = allergies.slice();
		console.log(response);

		return response;

	},
});