var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "MenuItems",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

module.exports= {
    menuItem: params
}