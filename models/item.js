const mongoose = require ('mongoose');

const ItemSchema = new mongoose.Schema({
	ingredient: {type: String, required: true},
	quantity: String, 
	measurement: String
});

const Item = mongoose.model('Item', ItemSchema);

 module.exports = Item;
