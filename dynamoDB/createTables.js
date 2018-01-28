var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
const params = require('../models/Restaurant.js');
console.log(params.restaurant);

dynamodb.createTable(params.restaurant, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});