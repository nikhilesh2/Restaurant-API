var cors                = require('cors');
var express             = require('express');
var restaurantRouter    = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


restaurantRouter.all('*', cors());

var restaurantRouter = express.Router();

const params = require('../models/Restaurant.js');



/* ======= RESTAURANTS ======= */
/* 
    This endpoint allows you to get detailed
    data about Restaurants and add new ones. 
*/
restaurantRouter.route('/')
    
    // retrieve all restaurants 
    .get(function (req, res) {
        docClient.scan({
            TableName : "Restaurants",
        }, function(err, data) {
            if (err) res.status(err.statusCode || 500).json(err); // an error occurred
            else     res.send(data);           // successful response
        });
    })
    
    // add new restaurant 
    .post(function (req, res) {
        const { name, restaurant_id, street_address, postal_code } = req.body;
        const id = generateID();
        var params = {
            TableName: "Restaurants",
            Item:{
                "restaurant_id": generateID(),
                "name": "Pizza Mart",
                "address":{
                    "street": "83 Aspen Rd",
                    "postal_code": 02067,
                }
            }
        };
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                res.send(data);
            }
        });
    });



/* ======= RESTAURANT BY ID ======= */
/* 
    This endpoint allows you search for
    restaurants based off certain attributes.
    ID can be found using SEARCH endpoint
*/
restaurantRouter.route('/:restaurant_id')
     
    // Retrieve Restaurant by ID   
    .get(function (req, res) {

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


/* ======= SEARCH ======= */
/* 
    This endpoint allows you search for
    restaurants based off certain attributes. 
*/
restaurantRouter.route('/search')
    
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
                         