var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Restaurants",
    KeySchema: [       
        { AttributeName: "restaurant_id", KeyType: "HASH"},
        { AttributeName: "name", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        // { AttributeName: "created", AttributeType: "S" },
        { AttributeName: "restaurant_id", AttributeType: "S" },
        { AttributeName: "name", AttributeType: "S" },
        // { AttributeName: "country", AttributeType: "S" },
        // { AttributeName: "postal_code", AttributeType: "S" },
        // { AttributeName: "street_address", AttributeType: "S" },
        // { AttributeName: "score", AttributeType: "N" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

module.exports= {
    restaurant: params
}