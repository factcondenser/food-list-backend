const mongoose = require ('mongoose');

const ItemSchema = new mongoose.Schema({
	ingredient: {type: String, required: true},
	quantity: String, 
	measurement: String
});

const Ingredient = mongoose.model('Ingredient', ItemSchema);

 module.exports = Ingredient;
