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
            if (err) { 
            	console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            }
           	else {
                if(data.Items.length !== 0)   return_obj = data;
            }
            callback(return_obj);
        });
	},
	retrieve_query_batch: function(keys, keyName, TableName, callback) {
		// var theKeys = [];
		// for(var i in keys)
		// 	theKeys.push({keyName: {S: keys[i]}});

		// var params = {
  // 			RequestItems: {
  //   			TableName: {
  //     				keys: theKeys,
  //     				ProjectionExpression: 'id, type',
  //   			}
  // 			}
		// };
		// var return_obj = {};
  //       docClient.query(params, function(err, data) {
  //           if (err) {
  //               console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  //           } else {
  //               if(data.Items.length !== 0)   return_obj = data;
  //           }
  //           callback(return_obj);
  //       });
         
	}
}