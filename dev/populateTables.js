var AWS         = require("aws-sdk");
var config      = require('../config.json');

AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
const params = require('../models/Restaurant.js');
const restaurants = require('../dev/StaticData/Restaurants.json');



module.exports = function () {
	dynamodb.createTable(params.restaurant, function(err, data) {
    	if (err) {
        	console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    	} else {
        	console.log("Created table. Table description JSON:");

        	Object.keys(restaurants).forEach(function(key) {

  			var params = {
            	TableName: "Restaurants",
            	Item: restaurants[key]

			}
			docClient.put(params, function(err, data) {
    			if (err) {
        			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    			} else {
    				return data;
    			}
			});

		})
    }
});

}
