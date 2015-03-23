"use strict"
var data = {name:'ben', company:'bevry'}
module.exports = function(){
	var result = []
	Object.getOwnPropertyNames(data).forEach(function(key){
		var value = data[key]
		result.push(key+': '+value)
	})
	return
}