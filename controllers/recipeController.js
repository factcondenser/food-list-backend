const express = require('express');
const router = express.Router();
const unirest = require('unirest');
//const key = require('key');


//Random Recipe - 3 count
router.get('/random', async (req, res) => {
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3")
	.header("X-RapidAPI-Key", 'hh5O4dgFV6msheOffoqu2Fj07cXDp1d6hTJjsn4rCIl78QdEiD')
	.end((results) => {
		res.json({
			status: 200,
			data: results,
			session: req.session
		})
	})
})

//Recipe Search - main
router.post('/search', async (req, res) => {
	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=25&query=" + req.body)
	.header("X-RapidAPI-Key", "hh5O4dgFV6msheOffoqu2Fj07cXDp1d6hTJjsn4rCIl78QdEiD")
	.end((results) => {
		res.json({
			status: 200,
			data: results,
			session: req.session
		})
	})
})

//

module.exports = router; 