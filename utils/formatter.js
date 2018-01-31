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
				image_url: item.image_url ? item.image_url : '',
				menu_ids: item.menu_ids,
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
		console.log("in ere");
		const items = data.Items ? data.Items : data;
		if (Object.keys(data).length === 0) return {};
		var formatted_data = [];

		for(var key in items) {
			item = items[key];
			formatted_data.push({
				id: item.id,
				type: item.type,
				hours: item.hours,
				menuItems: [],
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
				type: item.type,
				name: item.name,
				price: item.price,
				food_spec: {
					vegan: 'yes',
					vegetarian: 'yes',
					spicy: '6',

				},
				combos: {
					
				}
			})
		}
		return formatted_data;
	}
}