module.exports = ->
	data = {name:'ben', company:'bevry'}
	result = []
	for own key, value of data
		result.push(key+': '+value)
	return