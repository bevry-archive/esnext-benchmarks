'use strict'
var items = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z']
module.exports = function () {
	var result = []
	for ( var item of items ) {
		result.push(item)
	}
	return
}
