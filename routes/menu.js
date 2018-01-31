var cors                = require('cors');
var express             = require('express');
var menuRouter          = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var dynamoDB            = require('../dynamoDB/queries.js')
var generateQueryParams = require('../utils/generateQueryParams');

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
    
    // retrieve all restaurants 
    .get(function (req, res) {
       dynamoDB.retrieve_scan(TABLE_NAME, function(result) {
            const statusCode = result.Items ? 200 : 400;
            res.status(statusCode).send(result);
       })
    })
    
    // add new restaurant 
    .post(function (req, res) {
       
        // Ensure the request object is in the right from
        const verify_response = verifiers.verifyMenu_POST(req.body);
        if(verify_response.statusCode === 400) {
            return res.status(400).send(verify_response);
        }

        req.body.id = generateID(); // create a unique id

        // perform the query
        dynamoDB.put_query({TableName: TABLE_NAME, Item: req.body}, function(result) {
            res.status(result.statusCode).send(result);
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

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression
     
        // make the query
        dynamoDB.retrieve_query(params, function(result) {

            const statusCode = result.Items ? 200 : 404;
            if(statusCode !== 200) res.status(statusCode).send({});
   
            else  res.status(statusCode).send({statusCode: statusCode, Item: result.Items[0]});
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
            console.log('data returned');
            console.log(result);
            res.status(result.statusCode).send(result);
        })

    });
    

module.exports = {
  menuRouter: menuRouter
};
                         