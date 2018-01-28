var cors                = require('cors');
var express             = require('express');
var devRouter           = express.Router();
var config              = require('../config.json');

AWS = require("aws-sdk");
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();


devRouter.all('*', cors());

var devRouter = express.Router();

const params = require('../models/Restaurant.js');


/* ======= Table endpoint ======= */
devRouter.route('/:tableName')

    // retrieve all restaurants 
    .get(function (req, res) {

        dynamodb.deleteTable({TableName: req.params.tableName}, function(err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    })



module.exports = {
  devRouter: devRouter
};
                         