const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema({
	apiRecipeId: Number,
	title: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

 module.exports = Recipe;
