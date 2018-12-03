const express = require('express');
const router = express.Router();

const Ingredients = require('../models/ingredient');
const User = require('../models/user');
const TripList = require('../models/tripList');

//FOR PAST LISTS

//All Trips
router.get('/', async (req, res, next) => {
	const user = await User.findOne({username: req.session.username});
	const trips = await User.trips.find({});
	res.json({
		status: 200, 
		trips: trips
	})
})

//All Recipes

router.get('/', async (req, res, next) => {
	const user = await User.findOne({username: req.session.username});
	const recipes = await User.recipes.find({});
	res.json({
		status: 200, 
		recipes: recipes
	})
})




