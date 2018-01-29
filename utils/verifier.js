module.exports = {
	verifyRestaurant_POST: function(params) {
		const messages = [];
		if(!params.Item) return {statusCode: 400, message: "Invalid Object"};

		var item = params.Item;

		if(item.id) messages.push("ID attribute should not be passed in");

		// Required
		if(!item.name)					messages.push("name attribute must be set");
		if(!item.address)				messages.push("address attribute must be set");
		if(!item.city)					messages.push("city attribute must be set");
		if(!item.zip_code) 				messages.push("zip_code attribute must be set");
		if(!item.state) 				messages.push("state attribute must be set");
		if(!item.country) 				messages.push("country attribute must be set");
		if(!item.phone_number) 			messages.push("phone_number attribute must be set");
		if(!item.email) 				messages.push("email attribute must be set");
		if(!item.hours)					messages.push("hours Attribute must be set");

		// Optional - however must check if 'delivers' has a value, then it should be either 'yes' or 'no'
		if(item.delivers && 
		!(item.delivers !== 'yes' 
		|| item.delivers !== 'no'))		messages.push("delivers must be set to either 'yes' or 'no'");

		const response = {
			statusCode: messages.length === 0 ? 200 : 400,
			messages: messages
		}
		return response;
	}

}


