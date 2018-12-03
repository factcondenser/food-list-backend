const express   = require('express');
const router    = express.Router();
const User      = require('../models/user.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//Register a User
router.post('/register', async (req, res, next) => {
		try {
			//Check if user exists
		const findUser = await User.find({username: req.body.username});
		if (findUser.length > 0){
			req.session.message = "Username already taken"
			res.redirect('/login');
		} else {	
		//hash password
		const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
		const userEntry = {};
		userEntry.username    = req.body.username;
		userEntry.email    = req.body.email;
		userEntry.password    = passwordHash;
		const createUser = await User.create(userDbEntry);
		await user.save();
		res.redirect('/list')
		}//End of else
		} catch(e){
			next(e)
		}	//End of catch
});


//Login User Route
router.post('/login', async (req, res, next) => {
		try {
		const foundUser = await User.findOne({username: req.body.username})
		if(!foundUser){
			res.json({
				status: 400,
				data: 'Invalid Username or Password',
				session: req.session
			});
			console.log("bad username");
			res.redirect('/auth/login');
			} else {
			if(bcrypt.compareSync(req.body.password, foundUser.password)){
				req.session.loggedIn = true;
				req.session.username = foundUser.username;
				res.json({
					status: 201, 
					data: 'Login successful!',
					session: req.session
				})//end of json response
			}//end of if statement
		}//end of else statement
		} catch(e){
			next(e)
		}	
});

//Logout Route
router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		if(error){
			res.json({
				status: 400,
				data: 'Could Not Log out',
				session: req.session
			});
		} else {
				res.json({
					status: 201, 
					data: 'Logout Successful!',
					session: req.session
				})
		}//end of else
	});//end of destroy
});


module.exports = router;