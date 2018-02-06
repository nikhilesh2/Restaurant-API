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
    update_item_by_id: function(TableName, id, attributeToUpdate, newValue, callback) {
        const params = {
            TableName,
            Key: { id },
            UpdateExpression: "SET " + attributeToUpdate + " = :newValue",
            ExpressionAttributeValues: { 
                ":newValue": newValue
            },
            ReturnValues: "ALL_OLD"
        }
        console.log(params);
        dynamoDB.update_query(params, function(data) {
            callback(data);
        })
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
	},
    delete_menus: function(menu_ids, callback) {
        var finished_requests = 0;
        var finished_requests_sections = 0;
        var finished_requests_items = 0;
        const response = [];

        // loop through each menu, deleting it and its associated menu items
        for(var index in menu_ids) {
            // delete menu
            dynamoDB.delete_query({TableName: "Menus", Key: { "id": menu_ids[index]}, "ReturnValues": "ALL_OLD"}, function(result) {
             
                result.metaData = { menu_items: [] };

                // menu delete was successful, so move on to delete menu items
                if(result.statusCode == 200) {
                    const sections = result.Item.sections;
                  
                    
                 
                    // loop through menu sections and delete each menu item
                    for(var key in sections) {
                        
                        // loop through each menu item and delete it
                        for(var item_index in sections[key]) {
                            dynamoDB.delete_query({TableName: "MenuItems", Key: { "id": sections[key][item_index]}, "ReturnValues": "ALL_OLD"}, function(menu_item_res) {
                             
                                result.metaData.menu_items.push(menu_item_res); // In case menu item was not successfully deleted, return back the menu item
                                
                                if(++finished_requests_items >= sections[key].length)  {
                                    finished_requests_sections++;
                                    finished_requests_items = 0
                                } 
                                if(finished_requests_sections >= Object.keys(sections).length) {
                                    response.push(result);
                                    finished_requests++;
                                    finished_requests_sections = 0;
                                }  
                                if(finished_requests >= menu_ids.length)    callback(response);
      
                            })
                              
                        }
                         
                    }
                } 
                else { 
                    if(++finished_requests >= menu_ids.length)    callback(response);
                } 
            })
        }
    }
}