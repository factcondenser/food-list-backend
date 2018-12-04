const mongoose = require ('mongoose');
const TripList = require('./tripList');
const Recipe = require('./recipe');

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: 	  {type: String, required: true},
	password: {type: String, required: true},
	trips: [TripList.schema],
	recipes: [Recipe.schema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User
