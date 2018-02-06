var cors                = require('cors');
var express             = require('express');
var menuRouter          = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var dynamoDB            = require('../dynamoDB/queries.js')
var generateQueryParams = require('../utils/generateQueryParams');
var resource            = require('../utils/resourceMethods');
var batchParser         = require('../utils/batchParser');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var db          = new AWS.DynamoDB();
var docClient   = new AWS.DynamoDB.DocumentClient();


menuRouter.all('*', cors());

var menuRouter = express.Router();

const params = require('../models/Restaurant.js'); // TODO: replace with menu.js
const TABLE_NAME = "Menus";

// TODO: put in own file
const notAllowed = function() {
  return function(req, res) { res.status(405).send({statusCode: 405, message: "Method not allowed"}); };
}


/* ======= MENUS ======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
    menu ID or RestaurantID 
*/
menuRouter.route('/')
    
    // retrieve all menus
    .get(function (req, res) {
       resource.get_all(TABLE_NAME, function(response) {
            res.status(response.statusCode).send(response.data);
        })
    })
    
    // add new menu
    .post(function (req, res) {
       
        // Ensure the request object is in the right from
        const verify_response = verifiers.verifyMenu_POST(req.body);
        if(verify_response.statusCode === 400) {
            return res.status(400).send(verify_response);
        }

        // create the new menu
        resource.create(TABLE_NAME, req.body, function(response) {
            const restaurant_id = req.body.restaurant_id;

            // get restaurant by restaurant_id
            resource.get_by_id("Restaurants", {id: restaurant_id}, function(result) {

                if(result.statusCode !== 200) res.status(result.statusCode).send(result);
                const restaurant = result.data;
                restaurant.menu_ids.push(response.Item[0].id);
                
                // Add the new menu to the restaurant
                resource.update_item_by_id("Restaurants", restaurant_id, 'menu_ids', restaurant.menu_ids, function(result) {

                    if(result.statusCode !== 200) res.status(result.statusCode).send(result);
                    res.status(response.statusCode).send(response);
                })
             
            });
           
        });
    })

    // delete all menus 
    .delete(function (req, res) {
        resource.delete_all(TABLE_NAME, function(response) {

            // remove all of the menus for each restaurant
            resource.get_all("Restaurants", function(result) {
                const restaurants = result.data;
                var requests_finished = 0;
                for(var i in restaurants) {
                    resource.update_item_by_id("Restaurants", restaurants[i].id, 'menu_ids', [], function(result) {
                        if(++requests_finished >= restaurants.length) res.send(response);
                    })
                }
                // res.status(response.statusCode).send(response.data);
            })
            // res.status(200).send(response);
        })
    })



/* ======= MENU BY ID======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
*/
menuRouter.route('/:id')
    
    // retrieve menu based of menu id
    .get(function (req, res) {
        resource.get_by_id(TABLE_NAME, req.params, function(response) {
            res.status(response.statusCode).send(response.data);
        })
    })

    .post(notAllowed())

    // delete menu based of menu id
    // TODO: remove associated menu items
    .delete(function (req, res) {
        // Set up Params
        var params = {
            TableName: TABLE_NAME,
            Key: { "id": req.params.id },
            "ReturnValues": "ALL_OLD",
        };

        var final_response;
        // make the query
        dynamoDB.delete_query(params, function(result) {

            if(result.statusCode !== 200) res.status(result.statusCode).send(result);
            
            else {
                final_response = result;
                
                // need to remove menu from the corresponding restaurant
                var restaurant_id = result.Item.restaurant_id;
                
                // Get the restaurant
                resource.get_by_id("Restaurants", {id: restaurant_id}, function(response) {
                   
                    if(response.statusCode !== 200)  res.status(response.statusCode).send("Something went wrong");
                    
                    else {
                        // Remove the menu id from menu_ids array 
                        var menu_ids = response.data.menu_ids;
                        var index = menu_ids.indexOf(req.params.id)
                        menu_ids.splice(index, 1);
                        
                        // Update the menu_ids attribute of the restaurant with the new array
                        resource.update_item_by_id("Restaurants", restaurant_id, 'menu_ids', menu_ids, function(result) {
                             res.status(result.statusCode).send(final_response);
                        })
                       
                    }
                })
            }
        })

    });


/* ======= MENU-ITEM BY MENU_ID======= */
/* 
    This endpoint allows access MenuItems
    for a specific menu
*/
menuRouter.route('/:id/menu-items')
    
    .get(function (req, res) {
        // retrieve all menu items associated with menu id
        const menuItems = {Items: []};
        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression

        // make the query
        dynamoDB.retrieve_query(params, function(result) {
            const statusCode = result.Items ? 200 : 404;
            if(statusCode !== 200)  return res.status(statusCode).send([]);

            var sections = result.Items[0].sections;
            var response = {count: 0, MenuItems: []};
            var ids = [[]];
            var index = 0;
            var counter = 0;
            var length = 0;

            // Must split up menu items into 
            for(i in sections) {
                for(j in sections[i]) {
                    if(++counter >= batchParser.BATCH_MAX) {
                        ids[++index] = [];
                        counter = 0;
                    }
                    ids[index].push(sections[i][j]);
                    length++;
                }
            }
            for(var i = 0; i < ids.length; i++) {
                if(ids[i].length !== 0) {
                    resource.get_batch_menuItems(ids[i], function(result) {
                        response.count += result.count;
                        Array.prototype.push.apply(response.MenuItems,result.MenuItems);

                        if(response.count >= length)   res.send(response)
                    })
                }
                else res.status(404).send([]);
            }

        });
    })

    .post(notAllowed())

    // TODO: delete all items in a menu
    .delete(function (req, res) {
        resource.get_by_id(TABLE_NAME, req.params, function(result) {
            if(result.statusCode !== 200)   res.status(result.statusCode).send(result);
            else {
                var menu = result.data;
                var menu_item_ids = []
                // remove all menu item ids 
                for(var key in menu.sections)  {
                    for(var i in menu.sections[key])   menu_item_ids.push(menu.sections[key][i]); // save the id
                    menu.sections[key] = []; // erase the ids
                    
                } 
                resource.update_item_by_id(TABLE_NAME, menu.id, 'sections', menu.sections, function(result) {

                    // need to remove all associated menu items from MenuItems table
                    resource.delete_menu_items(menu_item_ids, function(response) {
                        res.status(200).send(response);
                    })

                })
            }
        })

    });
    

module.exports = {
  menuRouter: menuRouter
};
                         