const mongoose = require ('mongoose');

const TripSchema = new mongoose.Schema({
	tripName: {type: String, required: true},
	date: Date,
	itemList: [Item.Schema],
});

const TripList = mongoose.model('TripList', TripSchema);

 module.exports = TripList;
