module.exports = {
	formatRestaurant: function(data) {
		const items = data.Items ? data.Items : data;
		var formatted_data = [];
		for(var key in items) {
			item = items[key]
			formatted_data.push({
				id: item.id,
				name: item.name,
				image_url: item.image_url ? item.image_url : '',
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
	}
}