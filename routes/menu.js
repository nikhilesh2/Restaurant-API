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

        resource.create(TABLE_NAME, req.body, function(response) {
            res.status(response.statusCode).send(response);
        });
    });



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
    // delete menu based of menu id
    .delete(function (req, res) {
        // Set up Params
        var params = {
            TableName: TABLE_NAME,
            Key: { "id": req.params.id },
            "ReturnValues": "ALL_OLD",
        };

        // make the query
        dynamoDB.delete_query(params, function(result) {
            
            // TODO: need to remove menu from the corresponding restaurant
            var restaurant_id = result.Item.restaurant_id;
       
            res.status(result.statusCode).send(result);
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
            if(statusCode !== 200)  res.status(statusCode).send([]);

            var sections = result.Items[0].sections;
            var params = { RequestItems: {"MenuItems": {Keys:[] }}};

            for(i in sections)
                for(j in sections[i])
                params.RequestItems.MenuItems.Keys.push({id: {S: sections[i][j]}});

            // use menu ids to make batch query
            db.batchGetItem(params, function(err, data) {
                if (err) res.send({statusCode: 400, message: 'Unable to get menu items.'})
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
                    res.send(formatted_menuItems);
                } 
            });

        });
    })
    
    // TODO: delete all items in a menu
    .delete(function (req, res) {
        // Set up Params
        var params = {
            TableName: TABLE_NAME,
            Key: { "id": req.params.id },
            "ReturnValues": "ALL_OLD",
        };

        // make the query
        dynamoDB.delete_query(params, function(result) {
            
            // TODO: need to remove menu from the corresponding restaurant
            var restaurant_id = result.Item.restaurant_id;
       
            res.status(result.statusCode).send(result);
        })

    });
    

module.exports = {
  menuRouter: menuRouter
};
                         