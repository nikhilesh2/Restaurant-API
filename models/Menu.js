var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Menus",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: "restaurant_id", KeyType: "RANGE"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "restaurant_id", AttributeType: "S"},
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

module.exports= {
    menu: params
}