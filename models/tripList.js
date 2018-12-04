const mongoose = require ('mongoose');
const Item = require('./item');

const TripListSchema = new mongoose.Schema({
	tripName: {type: String, required: true},
	date: Date,
	itemList: [Item.schema]
});

const TripList = mongoose.model('TripList', TripListSchema);

 module.exports = TripList;
