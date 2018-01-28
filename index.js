var express 			= require('express');
var app 				= express();
var bodyParser          = require('body-parser');
var port 				= process.env.PORT || 5000;

var restaurantRouter 	= require('./routes/restaurant');
var devRouter 			= require('./routes/dev');




// Configure app to be able to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Establish endpoints
app.use('/dev', devRouter.devRouter);
app.use('/restaurants', restaurantRouter.restaurantRouter);


// Start server
app.listen(port, function() {
	console.log('Server is running on ' + port);
});