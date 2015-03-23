data = {name:'ben', company:'bevry'}
module.exports = ->
	result = []
	for own key, value of data
		result.push(key+': '+value)
	return