var cors                = require('cors');
var express             = require('express');
var menuRouter          = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var dynamoDB            = require('../dynamoDB/queries.js')
var generateQueryParams = require('../utils/generateQueryParams');
var resource            = require('../utils/resourceMethods');

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
    Menu ID or Restaurant ID 
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
    

module.exports = {
  menuRouter: menuRouter
};
                         