Meteor.methods({

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
	changeEmail: function(email){
		if(Meteor.isServer){
			if(Meteor.user()){
				if(email != Meteor.user().emails[0].address){
					if(typeof Meteor.users.findOne({"emails": {$elemMatch:{"address": email}}}) == 'undefined'){
						Meteor.users.update(Meteor.userId(), {$set: {"emails": [{"address": email, "verified" : false}]}});
						Accounts.sendVerificationEmail(Meteor.userId());
					}else{
						throw new Meteor.Error("Email already taken.");
					}
				}
			}
		}
	},
	changeName: function(name){
		if(Meteor.isServer){
			if(Meteor.user()){
				if(name != Meteor.user().profile.name){
					Meteor.users.update(Meteor.userId(), {$set: {"profile.name": name}});
				}
			}
		}
	},
	changeAllergies: function(allergies) {
		if(Meteor.isServer){
			if(Meteor.user()){
				if(Array.isArray(allergies)){
					Meteor.users.update(Meteor.userId(), {$set: {"profile.allergies": allergies}});
				}
			}
		}
	}
  // 	checkPassword: function(password) {
		// if(Meteor.user()){
		// 	var digest = {digest: password, algorithm: 'sha-256'};
		// 	var result = Accounts._checkPassword(Meteor.user(), digest);

		// 	return result.error == null;
		// }else{
		// 	return false;
		// }
  // 	}
});