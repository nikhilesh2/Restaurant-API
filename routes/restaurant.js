var cors                = require('cors');
var express             = require('express');
var restaurantRouter    = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var generateQueryParams = require('../utils/generateQueryParams');
var dynamoDB            = require('../dynamoDB/queries.js');
var GET                 = require('../utils/getResource');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var db = new AWS.DynamoDB();
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

        // perform a scan over all entries
        GET.get_all(TABLE_NAME, function(response) {
            res.status(response.statusCode).send(response.data);
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
        req.body.menus = req.body.menus ? req.body.menus : " "; // if menus are not set, set it
  
        var params = {
            TableName: TABLE_NAME,
            Item: req.body,
        }
   
        docClient.put(params, function(err, data) {
            if (err) {
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
        if(Object.keys(req.body).length === 0)          return res.status(400).send([]);
        
        //Ensure no empty strings were passed in
        for(var key in req.body) if(req.body[key] === ''){
            return res.status(400).end();
        } 

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams(TABLE_NAME, req.body);

        // perform the scan
        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).send([]);
            } else {
                res.status(200).send(formatter.formatRestaurant(data));
            }
        });
    })


/* ======= RESTAURANT BY ID ======= */
/* 
    This endpoint allows you to perform
    operations on a specific restaurant
    by ID
*/
restaurantRouter.route('/:id')

    // Retrieve Restaurant by ID   
    .get(function (req, res) {
        GET.get_by_id(TABLE_NAME, req.params, function(response) {
            res.status(response.statusCode).send(response.data);
        })
        // // generate the parameters for DB scan using the requested parameters
        // const params = generateQueryParams(TABLE_NAME, req.params);
        // params.KeyConditionExpression = "#id = :id";
        // delete params.FilterExpression
       
        // // make the query
        // dynamoDB.retrieve_query(params, function(result) {
        //     const statusCode = result.Items ? 200 : 404;
        //     res.status(statusCode).send({statusCode: statusCode, Item: formatter.formatRestaurant(result)[0]});
        // });
        
    })

    // Delete a Restaurant by ID
    .delete(function (req, res) {
        
        // Set up Params
        var params = {
            TableName: TABLE_NAME,
            Key: { "id": req.params.id }
        };

         // make the query
        dynamoDB.delete_query(params, function(result) {
            res.status(result.statusCode).send(result);
        })
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
    a restaurant menus based on restaurant ID
*/
restaurantRouter.route('/:id/menus')
       
    .get(function (req, res) {
        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression
       
        // make the query
        dynamoDB.retrieve_query(params, function(result) {
            const statusCode = result.Items ? 200 : 404;
            if(statusCode !== 200)  res.status(statusCode).send([]);

            var menu_ids = result.Items[0].menus.split(',');
            
        });
    })


module.exports = {
  restaurantRouter: restaurantRouter
};
                         