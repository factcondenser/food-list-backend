const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const Item = require('../models/item');
const User = require('../models/user');
const TripList = require('../models/tripList');

//For current list



//LIST INGREDIENTS FOR SELECTED TRIP - /list

//Ingredients are inside a trip list
//Trips are in an array in a user
router.get('/', async (req, res, next) => {
	const user = await User.findOne({username: req.session.username});
	const trip = await User.trips.findOne({tripName: req.session.currentTrip});
	const ingredients = await User.trips.itemList.find({});
	res.json({
		status: 200, 
		ingredients: ingredients
	})
})




/*******Separate from list itself*********/

//ADD Ingredient for selected trip - Manual
router.post('/', async (req, res, next) => {
		try {
			const newIngredient = await Ingredients.create(req.body);
			//Stay on same page, maybe res.redirect('/list')
		} catch(e){
			next(e)
		}	
});

//Delete Ingredient on ingredients list - /list
router.delete('/:id', async (req, res, next) => {
		try {
			const user = await User.findOne({username: req.session.username});
	const trip = await User.trips.findOne({tripName: req.session.currentTrip});
	const ingredients = await User.trips.itemList.findByIdAndRemove(req.params.id);
	//Don't redirect, stay on page
		} catch(e){
			next(e)
		}
		
})

//Complete Current List - CREATE grocery list
router.post('/', async (req, res, next) => {
		try {
		const findUser = await User.findOne({username: req.session.username});
		//const createItems = await 
		//Need to take every item in the box and push each one to an array
		const createTrip = await TripList.create({
			tripName: req.body.title,
			date: Date,
			items: allItems
		})
		const addRecipes = await User.recipes.push(addedRecipes)
		} catch(e){
			next(e)
		}
		
})

/*********Recipe API*******/
//Recipe Search - main
//Add route
router.get('/', async (req, res) => {
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=25&query=" + req.body)
	.header("X-RapidAPI-Key", "hh5O4dgFV6msheOffoqu2Fj07cXDp1d6hTJjsn4rCIl78QdEiD")
	.end(function (result) {
	  console.log(result.status, result.headers, result.body);
	});		
})


module.exports = router;
