/*
data = {name:'ben', company:'bevry'}
module.exports = ->
	result = []
	for own key, value of data
		result.push(key+': '+value)
	return
*/
// compiled with coffeescript 1.10.0
var data,
  hasProp = {}.hasOwnProperty;

data = {
  name: 'ben',
  company: 'bevry'
};

module.exports = function() {
  var key, result, value;
  result = [];
  for (key in data) {
    if (!hasProp.call(data, key)) continue;
    value = data[key];
    result.push(key + ': ' + value);
  }
};
