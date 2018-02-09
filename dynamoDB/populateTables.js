var AWS         = require("aws-sdk");
var config      = require('../config.json');

AWS.config.update(config.aws);

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
const params = require('../models/Restaurant.js');
const dynamodb = require('../dynamodb/queries');

const restaurants = require('../test/restaurantSample');
const menus = require('../test/menuSample');
const menuItems = require('../test/menuItemSample');


for(var key in restaurants.data) {
    const restaurant = restaurants.data[key];
    console.log("Adding restaurant: " + restaurant.id);
    dynamodb.put_query({TableName: 'Restaurants', Item: restaurant}, function(result) {
        if (result.statusCode == 400)   console.log("Failed to add restaurant: " + restaurant.id);
        else                            console.log("Successfully added Restaurant: " + restaurant.id);
    })
}

for(var key in menus.data) {
    const menu = menus.data[key];
    console.log("Adding menu: " + menu.id);
    dynamodb.put_query({TableName: 'Menus', Item: menu}, function(result) {
        if (result.statusCode == 400)   console.log("Failed to add Menu: " + menu.id);
        else                            console.log("Successfully added Menu: " + menu.id);
    })
}

for(var key in menuItems.data) {
    const menuItem = menuItems.data[key];
    console.log("Adding menu item: " + menuItem.id);
    dynamodb.put_query({TableName: 'MenuItems', Item: menuItem}, function(result) {
        if (result.statusCode == 400)   console.log("Failed to add menu item: " + menuItem.id);
        else                            console.log("Successfully added menu item: " + menuItem.id);
    })
}
