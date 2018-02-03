module.exports = {
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
	}
}
