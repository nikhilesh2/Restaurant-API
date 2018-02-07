var dynamoDB            = require('../dynamoDB/queries.js')
var formatter           = require('./formatter');
var config              = require('../config.json');
var generateQueryParams = require('./generateQueryParams');
var generateID          = require('./generateID');
var batchParser         = require('../utils/batchParser');

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
    delete_by_id: function(TableName, id, callback) {
        var params = {
            TableName,
            Key: { id },
            ReturnValues: "ALL_OLD"
        };
        // make the query
        dynamoDB.delete_query(params, function(result) {
           callback(result);
        })
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

        dynamoDB.update_query(params, function(data) {
            callback(data);
        })
    },
   
	delete_all: function(TableName, callback) {
		this.get_all(TableName, function(data) {
            const response = [];
            const items = data.data;
            if(items.length == 0)   callback([]);
            else {
                var finished_requests = 0;
                for(var index in items) {

                    // delete item
                    dynamoDB.delete_query({TableName, Key: { "id": items[index].id }, "ReturnValues": "ALL_OLD"}, function(result) {
                        response.push(result);
                        if(++finished_requests >= items.length)        callback(response);
                    })
                }
            }
		})
	},
    delete_menu_items: function(item_ids, callback) {
        if(!item_ids || item_ids.length === 0) {
            return callback([]);
        }

        const response = [];
        var finished_requests = 0;
        // loop through menu items and delete each one
        for(var index in item_ids) {
       
            dynamoDB.delete_query({TableName: "MenuItems", Key: {"id": item_ids[index]}, "ReturnValues": "ALL_OLD"}, function(result) {
                response.push(result);
                finished_requests++;
                if(finished_requests >= item_ids.length)       return callback(response);
            })
        }
    },
    delete_menus: function(menu_ids, callback) {

        if(menu_ids === undefined || menu_ids.length === 0) return callback([]);

        var finished_requests = 0;
        var finished_requests_sections = 0;

        const response = [];
        const delete_menu_items = this.delete_menu_items;

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
                        delete_menu_items(sections[key], function(data) {
                            result.metaData.menu_items.push(data);
                            if (++finished_requests_sections >= Object.keys(sections).length) {
                                response.push(result);
                                finished_requests++;
                                finished_requests_sections = 0;
                            }
                            if (finished_requests >= menu_ids.length)    callback(response);
                        })
                    }
                } 
                else {
                    if(++finished_requests >= menu_ids.length) return callback(response);
                } 
            })
        }
    },
    get_batch_menuItems: function(ids, callback) {
        // set up params
        var params = { RequestItems: {"MenuItems": {Keys:[] }}};
        for(var i in ids)
            params.RequestItems.MenuItems.Keys.push({id: {S: ids[i]}});
        
        const menuItems = {Items: []};
        db.batchGetItem(params, function(err, data) {
            if (err) { console.log(err); callback([]) }
            else {
                const res_menuItems = data.Responses.MenuItems;            
                var count = 0;
                for(i in res_menuItems) {
                    const res_menuItem = res_menuItems[i];
                    count++;
                    menuItems.Items.push({
                        id: res_menuItem.id.S, 
                        menu_id: res_menuItem.menu_id.S,
                        name: res_menuItem.name.S,
                        price: res_menuItem.price.S ? res_menuItem.price.S : res_menuItem.price.N,
                        description: res_menuItem.description.S,
                        isVegan: res_menuItem.isVegan.BOOL,
                        isVegetarian: res_menuItem.isVegan.BOOL,
                        spicy: res_menuItem.spicy.S ? res_menuItem.spicy.S : res_menuItem.spicy.N,
                        allergies: batchParser.parse_string_array(res_menuItem.allergies)
                    });
                }
                
                // TODO: add avg_rating
                var formatted_menuItems = { count, MenuItems: formatter.MenuItems(menuItems) }
                callback(formatted_menuItems);
            } 
        });
    }
}