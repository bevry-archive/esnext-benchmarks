/*
module.exports = (args...) ->
	return
*/
// compiled with coffeescript 1.10.0
var slice = [].slice;
module.exports = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
};
