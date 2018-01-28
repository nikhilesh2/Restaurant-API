var AWS         = require("aws-sdk");
var config      = require('../config.json');
AWS.config.update(config.aws);

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Restaurants",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},
        { AttributeName: "name", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "name", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

module.exports= {
    restaurant: params
}