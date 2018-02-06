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
// var menu = menus.data[0];
// var requests_finished = 0;
// f
// or(var id = 0; id < 232; id++) {
//     const menuItem = {
//         id: id.toString(),
//         menu_id: 'ea33e70e-1207-499e-bbe9-b9ed2323f932',
//         name: "Pad Thai",
//         price: 11.95,
//         description: 'Stir-fried rice noodles with eggs, vegetables and tofu in a sauce of tamarind, fish, dried shrimp, garlic, red chilli pepper and sugar.',
//         isVegan: false,
//         isVegetarian: false,
//         spicy: 6,
//         allergies: ['Peanuts'],
//     };
   

//     menu.sections["Tempura Rolls"].push(menuItem.id);
//     dynamodb.put_query({TableName: 'MenuItems', Item: menuItem}, function(result) {
//         if (result.statusCode == 400)   console.log("Failed to add menu item: " + menuItem.id);
//         else                            console.log("Successfully added menu item: " + menuItem.id);

//         if(++requests_finished === 39) {
//             dynamodb.put_query({TableName: 'Menus', Item: menu}, function(result) {
//                 if (result.statusCode == 400)   console.log("Failed to add menu item: " + menuItem.id);
//                 else                            console.log("Successfully added menu item: " + menuItem.id);
//             })
//         }

//     })
   
// }

