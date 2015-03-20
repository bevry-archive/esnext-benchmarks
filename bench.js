"use strict"
require('coffee-script/register')
let Benchmark = require('benchmark')
let pathUtil = require('path')
let scandir = require('scandirectory')
let featuresPath = __dirname+'/features'
scandir({
	path: featuresPath,
	recurse: true,
	next: function(err, list, features){
		Object.keys(features).forEach(function(feature){
			var suite = new Benchmark.Suite()
			Object.keys(features[feature]).forEach(function(test){
				let path = pathUtil.join(featuresPath, feature, test)
				let m = require(path)
				suite.add(test, m)
			})
			suite
				// output speed of each test
				.on('cycle', function(event) {
				  console.log(String(event.target));
				})
				// output which test was fatest
				.on('complete', function() {
				  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
				})
				// run the tests
				.run()
		})
	}
})

