var dynamoDB            = require('../dynamoDB/queries.js')
var formatter           = require('./formatter');
var config              = require('../config.json');
var generateQueryParams = require('./generateQueryParams');
var generateID          = require('./generateID');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
	get_all: function(TableName, callback) {
		var data_formatter = formatter[TableName];

		// perform a scan over all entries
		dynamoDB.retrieve_scan(TableName, function(data) {
			const statusCode = data.Items ? 200 : 400;

			if (statusCode == 200)		callback({ statusCode, data: data_formatter(data)})
            else callback({statusCode,  data: { statusCode, message: 'Unable to perform the request'}});
		});
	},
	get_by_id: function(TableName, params, callback) {
		var data_formatter = formatter[TableName];

		// generate the parameters for DB scan using the requested parameters
        const adj_params = generateQueryParams(TableName, params);
        adj_params.KeyConditionExpression = "#id = :id";
        delete adj_params.FilterExpression

        // make the query
		dynamoDB.retrieve_query(adj_params, function(data) {
            const statusCode = data.Items ? 200 : 404;

            if (statusCode == 200)		callback({ statusCode, data: data_formatter(data)[0]})
            else callback({statusCode,  data: { statusCode, message: 'Unable to perform the request'}});
        });

	},
	create: function(TableName, Item, callback) {
		var data_formatter = formatter[TableName];
		
		Item.id = generateID(); // create a unique id
        
        // req.body.menus = req.body.menus ? req.body.menus : " "; // if menus are not set, set it

        dynamoDB.put_query({TableName, Item}, function(data) {
        	data.Items = [data.Item];
        	delete data.Item;

            if (data.statusCode == 201)		data.Item = data_formatter(data.Items);
            
            delete data.Items;
            callback(data);
        });
	},
	delete_all: function(TableName, callback) {
		this.get_all(TableName, function(data) {
            const response = [];
            const items = data.data;
            var finished_requests = 0;
            for(var index in items) {

         		// delete item
        		dynamoDB.delete_query({TableName, Key: { "id": items[index].id }, "ReturnValues": "ALL_OLD"}, function(result) {
        			finished_requests++;
       				response.push(result);
       				if(finished_requests >= items.length)        callback(response);
       			})
            }
		})
	}
}