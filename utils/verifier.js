module.exports = {
	verifyRestaurant_POST: function(params) {
		const messages = [];
		if(params == null) return {statusCode: 400, message: "Invalid request object"};
		
		var item = params;

		if(item.id) 					messages.push("ID attribute should not be passed in");

		// Required
		if (!item.name)					messages.push("name attribute must be set");
		if (!item.address)				messages.push("address attribute must be set");
		if (!item.city)					messages.push("city attribute must be set");
		if (!item.zip_code)				messages.push("zip_code attribute must be set");
		if (!item.state) 				messages.push("state attribute must be set");
		if (!item.country) 				messages.push("country attribute must be set");
		if (!item.phone_number)			messages.push("phone_number attribute must be set");
		if (!item.email)				messages.push("email attribute must be set");
		if (!item.hours)				messages.push("hours Attribute must be set");

		// Optional - however must check if 'delivers' has a value, then it should be either 'yes' or 'no'
		if(item.delivers && 
		!(item.delivers !== 'yes' 
		|| item.delivers !== 'no'))		messages.push("delivers must be set to either 'yes' or 'no'");

		return formatResponse(messages);
	},
	verifyMenu_POST: function(params) {
		const messages = [];
		if(params == null) return {statusCode: 400, message: "Invalid request object"};
		
		var item = params;

		if(item.id) 					messages.push("ID attribute should not be passed in");
		
		// Required
		if(!item.type)					messages.push("type attribute must be set");
		if(!item.hours)					messages.push("hours attribute must be set");
		if(!item.restaurant_id)			messages.push("restaurant_id attribute must be set");

		if (!item.sections)				messages.push("sections attribute must be set");

		return formatResponse(messages);
		
	},
	verifyMenuItem_POST: function(params) {
		const messages = [];
		if(params == null) return { statusCode: 400, message: "Invalid request object" };
		
		var item = params;

		if(item.id) 					messages.push("ID attribute should not be passed in");
		
		// Required
		if(!item.menu_id)				messages.push("menu_id attribute must be set");
		if(!item.name)					messages.push("name attribute must be set");
		if(!item.price)					messages.push("price attribute must be set");
		if(!item.section)				messages.push("section attribute must be set");
		if(!item.description)			messages.push("description attribute must be set");
		if(item.isVegan === undefined)	messages.push("isVegan attribute must be set");
		if(item.isVegan === undefined)	messages.push("isVegetarian attribute must be set");
		if(!item.spicy)					messages.push("spicy attribute must be set");
		if(!item.allergies)				messages.push("allergies attribute must be set");

		return formatResponse(messages);
		
	}
}

var formatResponse = function(messages) {
	return {
		statusCode: messages.length === 0 ? 200 : 400,
		messages: messages
	}
}




