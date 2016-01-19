'use strict'
var eachr = require('eachr')
var items = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'x', 'z']
module.exports = function () {
	var result = []
	eachr(items, function (item) {
		result.push(item)
	})
	return
}
