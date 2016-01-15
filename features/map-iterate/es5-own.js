'use strict'
var data = {name:'ben', company:'bevry'}
module.exports = function () {
	var result = []
	for ( var key in data ) {
		if ( !data.hasOwnProperty(key) )  continue;
		var value = data[key]
		result.push(key + ': ' + value)
	}
	return
}
