var cors                = require('cors');
var express             = require('express');
var menuRouter          = express.Router();
var config              = require('../config.json');
var generateID          = require('../utils/generateID');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


menuRouter.all('*', cors());

var menuRouter = express.Router();

const params = require('../models/Restaurant.js'); // TODO: replace with menu.js



/* ======= MENUS ======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
    menu ID or RestaurantID 
*/
menuRouter.route('/')
    
    // retrieve all restaurants 
    .get(function (req, res) {
       
    })
    
    // add new restaurant 
    .post(function (req, res) {
       
    });



/* ======= MENUS BY ID======= */
/* 
    This endpoint allows you to get detailed
    data about Menu(s) based off either the
    Menu ID or Restaurant ID 
*/
menuRouter.route('/:restaurant_id')
    
    // retrieve all restaurants 
    .get(function (req, res) {
       
    })
    
    // add new restaurant 
    .post(function (req, res) {
       
    });

menuRouter.route('/:menu_id')
    
    // retrieve menu based of menu id
    .get(function (req, res) {
       
    })
    // delete menu based of menu id
    .delete(function (req, res) {
       
    });
    

module.exports = {
  menuRouter: menuRouter
};
                         