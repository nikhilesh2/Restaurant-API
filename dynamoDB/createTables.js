var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const models = [Restaurant.restaurant,Menu.menu];


for(var i in models) {
	dynamodb.createTable(models[i], function(err, data) {
    	if (err) {
        	console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    	} else {
        	console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    	}
	});
}