var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

module.exports = function() {

	dynamodb.listTables({}, function(err, data) {
		console.log(data);
		console.log("printed");
    	if (err) console.log(err, err.stack); // an error occurred
    	else     res.send(data);           // successful response

	});
}