import { HTTP } from 'meteor/http';

var searchDrug = function (term) {
	HTTP.call( 'METHOD', "http://www.webmd.com/api/qrl/LookupService.ashx?jsonp=jQuery18204622211846722426_1473889064854&format=json&metadata=rxotc%2Cgeneric_name%2Cmnid&q=" + term + "&s=3&sz=125&_=1473889942505", {}, function( error, response ) {
		console.log(response);
	});
}