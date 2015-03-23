"use strict"
module.exports = function(){
	let data = new Map().set('name', 'ben').set('company', 'bevry')
	var result = []
	data.forEach(function(value, key){
		result.push(key+': '+value)
	})
	return
}