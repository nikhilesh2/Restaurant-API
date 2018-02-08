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

const notAllowed = function() {
  return function(req, res) { res.status(405).send({statusCode: 405, message: "Method not allowed"}); };
}



/* ======= MENU ITEMS ======= */
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
    
    // add new menu item
    .post(function (req, res) {
       
        // Ensure the request object is in the right from
        const verify_response = verifiers.verifyMenuItem_POST(req.body);
        if(verify_response.statusCode === 400) {
            return res.status(400).send(verify_response);
        }

        req.body.id = generateID(); // create a unique id

        // perform the query
        resource.create(TABLE_NAME, req.body, function(result) {
            const menu_id = result.Item[0].menu_id;
            resource.get_by_id("Menus", {id: menu_id}, function(response) {
                if(response.statusCode === 404) return res.status(response.statusCode).send(response);

                const menu = response.data;
                if(menu.sections[req.body.section])   menu.sections[req.body.section].push(req.body.id);
                else    menu.sections[req.body.section] = [req.body.id];
                resource.update_item_by_id("Menus", menu_id, 'sections', menu.sections, function(response) {
                      res.status(result.statusCode).send(result);
                })
            })
          
        });
    })

    // delete all menu items
    .delete(function (req, res) {
        resource.delete_all(TABLE_NAME, function(response) {

            // remove all of the menu items for each menu
            resource.get_all("Menus", function(result) {
                const menus = result.data;
                if(menus.length === 0)    return res.send(response);

                var requests_finished = 0;
                for(var i in menus) {
                    const menu = menus[i];
                    for(var key in menu.sections)   menu.sections[key] = [];

                    resource.update_item_by_id("Menus", menu.id, 'sections', menu.sections, function(result) {
                        if(++requests_finished >= menus.length) res.status(200).send(response);
                    })
                }
            })
        })
    })



/* ======= MENU ITEM BY ID======= */
/* 
    This endpoint allows you to get detailed
    data about a Menu Item based off the menu 
    item id
*/
menuItemRouter.route('/:id')
    
    // retrieve menu item by menu item id
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

    .post(notAllowed())

    // delete menu item by id
    .delete(function (req, res) {

        resource.delete_by_id(TABLE_NAME, req.params.id, function(result) {
            if(result.statusCode !== 200)  return res.status(result.statusCode).send(result);

            const menu_id = result.Item.menu_id;

            // Remove deleted menu item from menu
            resource.get_by_id("Menus", { id: menu_id } , function(response) {
                const menu = response.data;
                for(var key in menu.sections) {
                    const index = menu.sections[key].indexOf(menu_id)
                    if(index > -1)  menu.sections[key].splice(index, 1);
                }
                resource.update_item_by_id("Menus", menu_id, 'sections', menu.sections, function(response) {
                    res.status(result.statusCode).send(result);
                });
              
            })
        })
    });
    

module.exports = {
  menuItemRouter: menuItemRouter
};
                         