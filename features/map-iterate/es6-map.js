'use strict'
let data = new Map().set('name', 'ben').set('company', 'bevry')
module.exports = function () {
	var result = []
	data.forEach(function (value, key) {
		result.push(key + ': ' + value)
	})
	return
}
