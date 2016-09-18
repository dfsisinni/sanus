Meteor.methods({
	'getDrugList' (query) {
		console.log(query);
		var result = Meteor.http.call("POSt", "http://www.webmd.com/api/qrl/LookupService.ashx?jsonp=jQuery18204622211846722426_1473889064854&format=json&metadata=rxotc%2Cgeneric_name%2Cmnid&q=" + query + "&s=3&sz=125&_=1473889942505");
		return result;
	},

	sendEmail: function (to, from, type, text) {


		var subject;
		if (type == "registration") {
			
		}

    	check([to, from, subject, text], [String]);
    	this.unblock();
    	Email.send({
      		to: to,
      		from: from,
      		subject: subject,
      		text: text
    	});
  	},


});