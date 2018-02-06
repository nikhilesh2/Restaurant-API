module.exports = {
	BATCH_MAX: 100,
	parse_string_array: function(arr) {
		var result = [];
		for(i in arr.L)
			result.push(arr.L[i].S);
		return result;
	},
	parse_hours: function(arr) {
		var result = {};
		const hours = arr.M;
		for(key in hours) {
			const open_times = hours[key].L;
			result[key] = [];
			for(timeKey in open_times) {
				result[key].push({
				hours_open_start: open_times[timeKey].M.hours_open_start.S,
				hours_open_end: open_times[timeKey].M.hours_open_end.S
			});
			}
			result[key]
		}
		return result;
	},
	parse_sections: function(arr) {
		var result = {};

		const sections = arr.M;
		for(key in sections) {
			const section = sections[key].L;
			result[key] = [];
			for(index in section) {
				result[key].push(section[index].S);
			}
		}
		return result;
	},
	parse_food_spec: function(arr) {
		var result = {};

		const food_spec = arr.M;
		result.isVegan = food_spec.isVegan.BOOL;
		result.isVegetarian = food_spec.isVegetarian.BOOL;
		result.spicy = food_spec.isVegetarian.S;
		result.allergies = this.parse_string_array(food_spec.allergies);
		
		return result;
	}
}
