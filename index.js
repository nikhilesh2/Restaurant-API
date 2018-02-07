var express				= require('express');
var app					= express();
var bodyParser			= require('body-parser');
var logger				= require('morgan');
var pretty 				= require('express-prettify');
var port				= process.env.PORT || 5000;

var restaurantRouter 	= require('./routes/restaurant');
var menuRouter 			= require('./routes/menu');
var menuItemRouter 		= require('./routes/menuItem');
var devRouter 			= require('./routes/dev');



// Configure app to be able to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prettify all responses
app.use(pretty({ query: 'pretty' }));


// Establish endpoints
app.use('/restaurants', restaurantRouter.restaurantRouter);
app.use('/menus', menuRouter.menuRouter);
app.use('/menu-items', menuItemRouter.menuItemRouter);


// Start server
app.listen(port, function() {
	console.log('Server is running on ' + port);
});

//export app
module.exports = app;