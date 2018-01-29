var cors                = require('cors');
var express             = require('express');
var restaurantRouter    = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var util                = require('util')

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


restaurantRouter.all('*', cors());

var restaurantRouter = express.Router();

const params = require('../models/Restaurant.js');
const TABLE_NAME = "Restaurants";



/* ======= RESTAURANTS ======= */
/* 
    This endpoint allows you to get detailed
    data about Restaurants and add new ones. 
*/
restaurantRouter.route('/')
    
    // retrieve all restaurants 
    .get(function (req, res) {
        docClient.scan({
            TableName : TABLE_NAME,
        }, function(err, data) {
            console.log();
            
            // var formatted_data = formatRestaurant(data);
            if (err) res.status(err.statusCode || 500).json(err); // an error occurred
            else     res.send(formatter.formatRestaurant(data));    // successful response
        });
    })
    
    // add new restaurant 
    .post(function (req, res) {
        const verify_response = verifiers.verifyRestaurant_POST(req.body);
        if(verify_response.statusCode === 400)  res.status(verify_response.statusCode).end(verify_response);
       
        req.body.Item.id = generateID();
        var params = {
            TableName: TABLE_NAME,
            Item: req.body.Item,
        }
   
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.send(data);
            }
        });
    });



/* ======= SEARCH ======= */
/* 
    This endpoint allows you search for
    restaurants based off certain attributes. 
*/
restaurantRouter.route('/search')

    // Retrieve based of search values
    .get(function (req, res) {
        const params = {
            TableName : TABLE_NAME,

            FilterExpression: "#name = :name and :email = email",
            ExpressionAttributeNames:{
                "#name": "name"
            },
            ExpressionAttributeValues: {
                // ":restaurant_id": '3a266680-0475-11e8-8589-19938989f56d',
                ":name": 'Pizza Mart',
                ":email": "pizzaMart@gmail.com"
            }
        }

        // perform the scan
        docClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.status(200);
                res.json(data);
            }
        });
    })


/* ======= RESTAURANT BY ID ======= */
/* 
    This endpoint allows you search for
    restaurants based off certain attributes.
    ID can be found using SEARCH endpoint
*/
restaurantRouter.route('/:restaurant_id')

    // Retrieve Restaurant by ID   
    .get(function (req, res) {

        // Set up params for query
        const params = {
            TableName : TABLE_NAME,
            id: req.params.restaurant_id,
            KeyConditionExpression: "#id = :restaurant_id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":restaurant_id": req.params.restaurant_id
            }
        }

        // make the query
        docClient.query(params, function(err, data) {
            if (err) {
                console.log(err);
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.status(200);
                res.json(data);
            }
        });
    })


/* ======= REVIEWS ======= */
/* 
    This endpoint allows you to retrieve
    reviews of a restaurant.
*/
restaurantRouter.route('/reviews/:restaurant_id')
    
    // Retrieve Restaurant by ID   
    .get(function (req, res) {


    })


/* ======= MENUS ======= */
/* 
    This endpoint allows you to retrieve
    a restaurant menu based on restaurant ID
*/
restaurantRouter.route('/menu/:restaurant_id')
       
    .get(function (req, res) {
   
    })




module.exports = {
  restaurantRouter: restaurantRouter
};
                         