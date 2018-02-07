var cors                = require('cors');
var express             = require('express');
var restaurantRouter    = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');
var verifiers           = require('../utils/verifier');
var formatter           = require('../utils/formatter');
var generateQueryParams = require('../utils/generateQueryParams');
var dynamoDB            = require('../dynamoDB/queries.js');
var resource            = require('../utils/resourceMethods');
var batchParser         = require('../utils/batchParser');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

restaurantRouter.all('*', cors());

var restaurantRouter = express.Router();

const params = require('../models/Restaurant.js');
const TABLE_NAME = "Restaurants";

// TODO: put in own file
const notAllowed = function() {
  return function(req, res) { res.status(405).send({statusCode: 405, message: "Method not allowed"}); };
}





/* ======= RESTAURANTS ======= */
/* 
    This endpoint allows you to get detailed
    data about Restaurants and add new ones. 
*/
restaurantRouter.route('/')
    
    // retrieve all restaurants 
    .get(function (req, res) {

        // perform a scan over all entries
        resource.get_all(TABLE_NAME, function(response) {
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

        resource.create(TABLE_NAME, req.body, function(response) {
            res.status(response.statusCode).send(response);
        })
    })
    
    // delete all restaurants 
    .delete(function (req, res) {
        resource.delete_all(TABLE_NAME, function(response) {
            // delete all menus associated with each restaurant
            const restaurants = response;
            var requests_finished = 0;
            if(restaurants.length === 0) return res.status(404).send(response);

            for(var i in restaurants) {
                response[i].metaData = { menus: [] };
                resource.delete_menus(restaurants[i].Item.menu_ids, function(result) {
                    if(result.length !== 0 )    response[i].metaData.menus.push(result);
                    if(++requests_finished >= restaurants.length) return res.status(200).send(response);
                })
            }
        })
    })


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
        for(var key in req.body) if(req.body[key] === '') return res.status(400).send([]);

        // generate the parameters for DB scan using the requested parameters
        const params = generateQueryParams(TABLE_NAME, req.body);

        // perform the scan
        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                return res.status(404).send([]);
            } else {
                res.status(200).send(formatter[TABLE_NAME](data));
            }
        });
    })

    .post(notAllowed())

    .delete(notAllowed())


/* ======= RESTAURANT BY ID ======= */
/* 
    This endpoint allows you to perform
    operations on a specific restaurant
    by ID
*/
restaurantRouter.route('/:id')

    // Retrieve Restaurant by ID   
    .get(function (req, res) {
        resource.get_by_id(TABLE_NAME, req.params, function(response) {
            res.status(response.statusCode).send(response.data);
        })
    })

    .post(notAllowed())

    // Delete a Restaurant by ID
    .delete(function (req, res) {
        resource.delete_by_id(TABLE_NAME, req.params.id, function(result) {
            if(result.statusCode !== 200)  return res.status(404).send(result)

            // Delete associated menus
            resource.delete_menus(result.Item.menu_ids, function(response) {
                    res.status(200).send(result);
            })
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
    a restaurants' menus based on restaurant ID
*/
restaurantRouter.route('/:id/menus')
       
    .get(function (req, res) {
        const menus = {Items: []};
        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression
       
        // make the query
        dynamoDB.retrieve_query(params, function(result) {
            const statusCode = result.Items ? 200 : 404;
            if(statusCode !== 200)  res.status(statusCode).send([]);

            var menu_ids = result.Items[0].menu_ids;
            var params = { RequestItems: {"Menus": {Keys:[] }}};

            for(i in menu_ids)
                params.RequestItems.Menus.Keys.push({id: {S: menu_ids[i]}});


            // use menu ids to make batch query
            db.batchGetItem(params, function(err, data) {
                if (err) res.send({statusCode: 400, message: 'Unable to get items.'})
                else {
                    const res_menus = data.Responses.Menus;             
                    var count = 0;
                    for(i in res_menus) {
                        const res_menu = res_menus[i];
                        count++;
                        menus.Items.push({
                            id: res_menu.id.S, 
                            restaurant_id: res_menu.restaurant_id.S, 
                            type: res_menu.type.S,
                            sections: batchParser.parse_sections(res_menu.sections),
                            hours: batchParser.parse_hours(res_menu.hours),
                        });
                    }
                    
                    var formatted_menus = { count, Menus: formatter.Menus(menus) }
                    res.send(formatted_menus);
                } 
            });

        });
    })

    .post(notAllowed())

    // delete all menus for a restaurant
    // TODO: remove menus from menu table
    .delete(function (req, res) {

        const params = generateQueryParams(TABLE_NAME, req.params);
        params.KeyConditionExpression = "#id = :id";
        delete params.FilterExpression

        dynamoDB.retrieve_query(params, function(result) {
            // TODO: need to error check here
            var restaurant = result.Items[0];
            if(restaurant.menu_ids.length > 0) {
                resource.update_item_by_id(TABLE_NAME, restaurant.id, 'menu_ids', [], function(result) {

                    // need to remove all associated menus from Menus table
                    resource.delete_menus(restaurant.menu_ids, function(response) {
                        res.status(200).send(response);
                    })

                })
            } 
            else {
                res.status(404).send({statusCode: 404, message: 'Restaurant has no menus to remove'});
            }
        });
    })


module.exports = {
  restaurantRouter: restaurantRouter
};                