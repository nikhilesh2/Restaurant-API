var config = require('../config.json');
AWS = require("aws-sdk");
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
	retrieve_query: function(params, callback) {
    var return_obj = {};
      docClient.query(params, function(err, data) {
            if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            } else {
                if(data.Items.length !== 0)   return_obj = data;
            }
            callback(return_obj);
        });
         
	},
	retrieve_scan: function(TableName, callback) {
		var return_obj = {};
		 docClient.scan({
            TableName : TableName,
        }, function(err, data) {
            if (err) console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
           	else {
				 return_obj = data;
            }
            callback(return_obj);
        });
	},
	put_query: function(params, callback) {
		docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback({statusCode: 400, message: 'Unable to add item.'})
        } else {
            callback({statusCode: 201, message: "Added item successfully", Item: params.Item});
        }
    });
	},
	delete_query: function(params, callback) {

		docClient.delete(params, function(err, data) {
        if (err)				            callback({ statusCode: 404, message: "Something went wrong trying to delete the item" });
        else if (!data.Attributes)	callback({ statusCode: 404, message: "Item not found" });
        else 					              callback({ statusCode: 200, message: "Deleted item successfully", Item: data.Attributes });
    });
	},
  update_query: function(params, callback) {

    docClient.update(params, function(err, data) {
        if (err)                    callback({ statusCode: 404, message: "Something went wrong trying to delete the item" });
        else if (!data.Attributes)  callback({ statusCode: 404, message: "Item to update not found" });
        else                        callback({ statusCode: 200, message: "Updated item successfully", Item: data.Attributes });
    });
  },
}