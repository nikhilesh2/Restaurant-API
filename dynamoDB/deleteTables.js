var AWS         = require("aws-sdk");
var config      = require('../config.json');

AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
const params = require('../models/Restaurant.js');
const listTables = require('./listTables');

dynamodb.listTables({}, function(err, data) {
	if (err) console.log(err, err.stack); // an error occurred
	else {
		const tables = data.TableNames;
		for(var index in tables) {
            console.log("Deleting table: " + tables[index] + "...")
			dynamodb.deleteTable({TableName: tables[index]}, function(err, data) {
				if (err) {
    				console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
				} else {
    				console.log("Deleted table successfully");
				}
			});
		}
	}

});
