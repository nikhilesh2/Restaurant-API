var cors                = require('cors');
var express             = require('express');
var menuItemRouter      = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var dynamoDB            = require('../dynamoDB/queries.js')
var generateQueryParams = require('../utils/generateQueryParams');
var resource            = require('../utils/resourceMethods');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var db                  = new AWS.DynamoDB();
var docClient           = new AWS.DynamoDB.DocumentClient();


menuItemRouter.all('*', cors());

var menuItemRouter = express.Router();

const params = require('../models/Restaurant.js'); // TODO: replace with menuItem.js
const TABLE_NAME = "MenuItems";



/* ======= MENUS ======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
    menu ID or RestaurantID 
*/
menuItemRouter.route('/')
    
    // retrieve all menus
    .get(function (req, res) {
       resource.get_all(TABLE_NAME, function(response) {
            res.status(response.statusCode).send(response.data);
        })
    })
    
    // add new menu
    .post(function (req, res) {
       
        // // Ensure the request object is in the right from
        // const verify_response = verifiers.verifyMenu_POST(req.body);
        // if(verify_response.statusCode === 400) {
        //     return res.status(400).send(verify_response);
        // }

        // req.body.id = generateID(); // create a unique id

        // // perform the query
        // dynamoDB.put_query({TableName: TABLE_NAME, Item: req.body}, function(result) {
        //     res.status(result.statusCode).send(result);
        // });
    });



/* ======= MENU BY ID======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
    Menu ID or Restaurant ID 
*/
menuItemRouter.route('/:id')
    
    // retrieve menu based of menu id
    .get(function (req, res) {

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression
     
        // make the query
        dynamoDB.retrieve_query(params, function(result) {

            const statusCode = result.Items ? 200 : 404;
            if(statusCode !== 200) res.status(statusCode).send({});
   
            else   {
                const unformatted_data = { Items: [result.Items[0]] };
                res.status(statusCode).send(formatter.MenuItems(unformatted_data)[0]); // TODO: refactor this
            }
        });
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
  menuItemRouter: menuItemRouter
};
                         