

module.exports = function(TableName, params) {
	const adj_params = {};

	 var FilterExpression = "";
	 var ExpressionAttributeNames = {};
	 var ExpressionAttributeValues = {};

	
	if(params.name) {
 		
 		FilterExpression = params.name ? "#name = :name" : "";
 		ExpressionAttributeNames["#name"] = ':name';
 		ExpressionAttributeValues[":name"] = params.name;
	}
	for(var key in params) {
		if (FilterExpression !== "") 	FilterExpression += " and ";
		FilterExpression += '#' + key + ' = ' + ':' + key;
		ExpressionAttributeNames['#' + key] = key;
		ExpressionAttributeValues[':' + key] = params[key];
	}

      
    adj_params.TableName = TableName;
    adj_params.FilterExpression = FilterExpression;
    adj_params.ExpressionAttributeNames = ExpressionAttributeNames;
    adj_params.ExpressionAttributeValues = ExpressionAttributeValues;

    return adj_params;
}