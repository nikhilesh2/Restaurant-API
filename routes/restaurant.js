var cors                = require('cors');
var express             = require('express');
var restaurantRouter    = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var generateQueryParams = require('../utils/generateQueryParams');
var dynamoCache         = require('dynamo-cache'); 

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
            else     res.send(formatter.formatRestaurant(data));    // successful response
        });
    })
    
    // add new restaurant 
    .post(function (req, res) {
        
        // Ensure the request object is in the right from
        const verify_response = verifiers.verifyRestaurant_POST(req.body);
        if(verify_response.statusCode === 400) {
            return res.status(400).send(verify_response);
        }

        req.body.id = generateID(); // create a unique id
  
        var params = {
            TableName: TABLE_NAME,
            Item: req.body,
        }
   
        docClient.put(params, function(err, data) {
            if (err) {
                console.log(err);
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.status(201).send({statusCode: 201, message: "Added item successfully", Item: formatter.formatRestaurant([req.body])});
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

        // Ensure there are parameters to search with
        if(Object.keys(req.body).length === 0)          return res.status(400).end();
        
        //Ensure no empty strings were passed in
        for(var key in req.body) if(req.body[key] === ''){
            return res.status(400).end();
        } 

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams("Restaurants", req.body);

        // perform the scan
        docClient.scan(params, function(err, data) {
            if (err) {
                console.log(err);
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.status(200).send(formatter.formatRestaurant(data));
            }
        });
    })


/* ======= RESTAURANT BY ID ======= */
/* 
    This endpoint allows you search for
    restaurants based off certain attributes.
    ID can be found using SEARCH endpoint
*/
restaurantRouter.route('/:id')

    // Retrieve Restaurant by ID   
    .get(function (req, res) {

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams("Restaurants", req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression
       
        // make the query
        docClient.query(params, function(err, data) {
            if (err) {
                console.log(err);
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).end();
            } else {
                res.status(200).send(formatter.formatRestaurant(data)[0])
            }
        });
    })
    .delete(function (req, res) {

        // TODO
        // // Set up params for query
        // const params = {
        //     TableName : TABLE_NAME,
        //     id: req.params.restaurant_id,
        //     KeyConditionExpression: "#id = :restaurant_id",
        //     ExpressionAttributeNames:{
        //         "#id": "id"
        //     },
        //     ExpressionAttributeValues: {
        //         ":restaurant_id": req.params.restaurant_id
        //     }
        // }

        // // make the query
        // docClient.query(params, function(err, data) {
        //     if (err) {
        //         console.log(err);
        //         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        //         return res.status(404).end();
        //     } else {
        //         res.status(200);
        //         res.json(data);
        //     }
        // });
    })

/* ======= REVIEWS ======= */
/* 
    This endpoint allows you to retrieve
    reviews of a restaurant.
*/
restaurantRouter.route('/:id/reviews')
    
    // Retrieve Restaurant by ID   
    .get(function (req, res) {


    })


/* ======= MENUS ======= */
/* 
    This endpoint allows you to retrieve
    a restaurant menu based on restaurant ID
*/
restaurantRouter.route('/:id/menus')
       
    .get(function (req, res) {
   
    })




module.exports = {
  restaurantRouter: restaurantRouter
};
                         