require('dotenv').config();

const express = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const cors           = require('cors');
const session        = require('express-session');

require('./db/db');

//Middelware
app.use(methodOverride('_method'));

app.use(session({
  secret: "This is a string, the string of strings",
  resave: false,
  saveUninitialized: false // legal
}));

//Doesn't hurt, but isn't necessary because I'm not sending forms

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


//Controllers
const authController 	 = require('./controllers/authController.js');
const recipeController 	 = require('./controllers/recipeController.js');
const listController 	 = require('./controllers/listController.js');
const ingredientController 	 = require('./controllers/ingredientController.js');



//Use controllers
app.use('/auth', authController);
// app.use('/user', userController);
app.use('/recipe', recipeController);
app.use('/current', listController);

//Inside here is /search and /random






app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
    const today = new Date();
    console.log(today.toLocaleDateString('en-US') + ': ' + today.toLocaleTimeString('en-US'));
});