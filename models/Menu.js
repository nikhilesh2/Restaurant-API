var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Menu",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: "type", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "type", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

module.exports= {
    menu: params
}