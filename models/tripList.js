const mongoose = require ('mongoose');
const Item = require('./item');
const Recipe = require('./recipe');

const TripListSchema = new mongoose.Schema({
	tripName: {type: String, required: true},
	date: Date,
	itemList: [Item.schema],
	recipeList: [Recipe.schema]
});

const TripList = mongoose.model('TripList', TripListSchema);

 module.exports = TripList;
