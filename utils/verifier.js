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
		// if(!item.menus)					messages.push("menus Attribute must be set");

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
		else 							messages.push(verifySections(item.sections));

		return formatResponse(messages);
		
	}
}

var formatResponse = function(messages) {
	messages = messages[0] === null ? [] : messages;
	return {
		statusCode: messages.length === 0 ? 200 : 400,
		messages: messages
	}
}

var verifySections = function(sections) {
	try {	
		sections = JSON.stringify(sections).replace(/'/g, '"');
		sections = JSON.parse(sections);	
	}
 	catch(e) 	{	
 		return "section object is not in proper JSON form";	
 	}

	if(typeof sections === 'object') {
		for(var key in sections) {
			if(typeof key !== 'string') return "section names must be strings";

			else {
				for(var i in sections[key]) {					
					if(typeof sections[key][i] !== 'string') "menu ids must be strings";
				}
			}
		}
	} 
	else return "sections must be an object";
	return null;
}

