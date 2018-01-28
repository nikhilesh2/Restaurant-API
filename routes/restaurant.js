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
            if (err) res.status(err.statusCode || 500).json(err); // an error occurred
            else     res.send(data);           // successful response
        });
    })
    
    // add new restaurant 
    .post(function (req, res) {
        const { name, restaurant_id, street_address, postal_code } = req.body;
        var params = {
            TableName: TABLE_NAME,
            Item:{
                "id": generateID(),
                "name": "Pizza Mart",
                "address": {
                    "street": "83 Aspen Rd",
                    "postal_code": 02067,
                },
                "contact": {
                    "phone_number": "781-322-4440",
                    "email": "pizzaMart@gmail.com",
                },
                "hours": {
                    "Monday": [
                        {
                            "hours_open_start": "10:00",
                            "hours_open_end":  "13:00",
                        },
                        {
                            "hours_open_start": "16:00",
                            "hours_open_end":  "17:00",
                        }
                    ],
                    "Wednesday": [
                        {
                            "hours_open_start": "10:00",
                            "hours_open_end":  "13:00",
                        }
                    ],
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
                // console.log("Query succeeded.");
                // data.Items.forEach(function(item) {
                //     console.log(" -", item.id + ": " + item.name);
                // });
                return res.status(200).end();
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
                         