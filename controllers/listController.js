const express = require('express');
const router = express.Router();
const unirest = require('unirest');
const Item = require('../models/item');
const User = require('../models/user');
const TripList = require('../models/tripList');

//CURRENT list

//List Ingredients for current Trip
router.get('/items', async (req, res, next) => {
	const user = await User.findOne({username: req.session.username});
	const trip = await User.trips.findOne({tripName: req.session.currentTrip});
	const ingredients = await User.trips.itemList.find({});
	res.json({
		status: 200, 
		ingredients: ingredients
	})
})


//List Recipes for current Trip - list
router.get('/recipes', async (req, res) => {
	const user = await User.findOne({username: req.session.username});
	const trip = await User.trips.findOne({tripName: req.session.currentTrip});
	const recipes = await User.trips.recipeList.find({});
	res.json({
		status: 200,
		recipes: recipes
	})
})



//ADD Ingredient for selected trip - Manual
// router.post('/', async (req, res, next) => {
// 		try {
// 			const newIngredient = await Ingredient.create(req.body);
// 			//Stay on same page, maybe res.redirect('/list')
// 		} catch(e){
// 			next(e)
// 		}	
// });


//Delete Ingredient on ingredients list - /list
router.delete('/list/:id', async (req, res, next) => {
		try {
			//
			const user = await User.findOne({username: req.session.username});
			const trip = await User.trips.findOne({tripName: req.session.currentTrip});
			const ingredients = await User.trips.itemList.findByIdAndRemove(req.params.id);
		} catch(e){
			next(e)
		}
		
})

//Delete Recipe on recipe list
router.delete('/recipe/:id', async (req, res, next) => {
		try {
			const user = await User.findOne({username: req.session.username});
			const trip = await User.trips.findOne({tripName: req.session.currentTrip});
			const recipes = await User.trip.recipeList.findByIdAndRemove(req.params.id);
			//Also delete ingredients on ingredient list based on recipe
			//NEEDS WORK
		} catch(e){
			next(e)
		}
		
})

//NO edit routes, because that will be done on REACT front end


//Complete Current List - CREATE grocery list
//add ingredients to grocery list
//add recipes to the recipes
router.post('/', async (req, res, next) => {
		console.log(req.body);
		try {
		//Create trip first, push stuff into trip
		const createdTrip = await TripList.create({
			tripName: req.body.tripName,
			date: req.body.date
		})
		for(let i = 0; i < req.body.itemList.length; i++){
			//validate ingredient against database of ingredients
			const singleItem = req.body.itemList[i];
			//add new ingredients to that model
			createdTrip.itemList.push(singleItem);
			createdTrip.save();
			//push in each ingredient into createdTrip.tripList
		}
		for(let i = 0; i < req.body.recipeList.length; i++){
			const singleRecipe = req.body.recipeList[i];
			createdTrip.recipeList.push(singleRecipe);
			createdTrip.save();
		}
		// add createdTrip to user
		const findUser = await User.findOne({username: req.session.username});
		findUser.trips.push(createdTrip)
		//add createdTrip title, date, 
		findUser.save();
		res.json({
			status: 201, 
			data: createdTrip,
			session: req.session
		})
		// user.save
		} catch(e){
			next(e)
		}		
})


//What does a trip look like? 
/* trips: [
	{
		tripName: "test",
		date: '12/4/18',
		itemList: [
			{
				inredient: "butter",
				quantity: 1,
				measurement: tbsp
			}
		],
		recipeList: [
			{
			apiRecipeId: 12432,
			title: "test recipe"
			}
		]
	}]
*/


// ]
// tripList: [
// 	{ //ingredients
// 		cheese: {
// 			quantity: "1",
// 			measurement: "oz",
// 		}
// 	}
// ]
// //How many recipes are going in
// recipes: [
// {
// 	apiRecipeId: 21214,
// 	title: "who knows"
// }
// ]


//PAST list
router.get('/past/:trip', async (req, res) => {
	const user = await User.findOne({username: req.session.username});
	const trips = await TripList.findById(req.params.id);
	res.json({
		status: 200,
		data: trips
	})
})
module.exports = router;
