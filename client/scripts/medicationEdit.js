Template.medicineEdit.helpers({
	dayNumbers: function () {
		var days = [];
		for (var i = 1; i < 31; i++) {
			days.push({ val: i-1, day: i });
		};
		return days;
	},
	months: function() {
		return [{
				val: 0,
				month: "January"
			},
			{
				val: 1,
				month: "February"
			},
			{
				val: 2,
				month: "March"
			},
			{
				val: 3,
				month: "April"
			},
			{
				val: 4,
				month: "May"
			},
			{
				val: 5,
				month: "June"
			},
			{
				val: 6,
				month: "July"
			},
			{
				val: 7,
				month: "August"
			},
			{
				val: 8,
				month: "September"
			},
			{
				val: 9,
				month: "October"
			},
			{
				val: 10,
				month: "November"
			},
			{
				val: 11,
				month: "December"
		}];
	},
	years: function() {
		var years =  [];
		for (var i = 2016; i < 2051; i++) {
			years.push({ val: i, year: i });
		};
		return years;
	}
});