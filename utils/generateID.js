const uuidv1 = require('uuid/v1');

module.exports = function() {
	console.log("called");
	return uuidv1();
}