// Define and properly format our models here

module.exports = {
	Restaurants: function(data) {
		const items = data.Items ? data.Items : data;
		if (Object.keys(data).length === 0) return {};
		var formatted_data = [];
		for(var key in items) {
			item = items[key];
			formatted_data.push({
				id: item.id,
				name: item.name,
				description: item.description,
				website: item.website,
				image_url: item.image_url ? item.image_url : '',
				menu_ids: item.menu_ids ? item.menu_ids : [],
				delivers: item.delivers ? item.delivers : 'no',
				location: {
					address: item.address,
					city: item.city,
					state: item.state,
					zip_code: item.zip_code,
					country: item.country,
				},
				contact: {
					phone_number: item.phone_number,
					email: item.email
				},
				hours: item.hours
			})
		}

		return formatted_data;
	},
	Menus: function(data) {
		const items = data.Items ? data.Items : data;
		if (Object.keys(data).length === 0) return {};
		var formatted_data = [];

		for(var key in items) {
			item = items[key];
			formatted_data.push({
				id: item.id,
				restaurant_id: item.restaurant_id,
				type: item.type,
				hours: item.hours,
				sections: item.sections ? item.sections : [],
			})
		}
		return formatted_data;
	},
	MenuItems: function(data) {
		const items = data.Items ? data.Items : data;
		if (Object.keys(data).length === 0) return {};
		var formatted_data = [];

		for(var key in items) {
			item = items[key];
			formatted_data.push({
				id: item.id,
				menu_id: item.menu_id,
				section: item.section,
				name: item.name,
				price: item.price,
				description: item.description,
				food_spec: {
					isVegan: item.isVegan,
					isVegetarian: item.isVegetarian,
					spicy: item.spicy,
					allergies: item.allergies
				}
			})
		}
		return formatted_data;
	}
}