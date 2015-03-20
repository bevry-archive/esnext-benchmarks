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
		let suites = []
		Object.keys(features).forEach(function(feature){
			// Create the benchmarks suite for the feature
			var suite = new Benchmark.Suite(feature, {
				// output speed of each test
				onCycle: function(event) {
				  console.log(String(event.target));
				},
				// output which test was fatest
				onComplete: function() {
					console.log('Fastest of '+feature+' is ' + this.filter('fastest').pluck('name'));
				}
			})
			// Add the tests for the feature
			Object.keys(features[feature]).forEach(function(test){
				let path = pathUtil.join(featuresPath, feature, test)
				let m = require(path)
				suite.add(test, m)
			})
			// Run the benchmarks for the tests for the feature
			suites.push(suite)
		})
		Benchmark.invoke(suites, {
			// invoke the `run` method
			name: 'run',
			// pass a single argument
			'args': true,
			// treat as queue, removing benchmarks from front of `benches` until empty
			queued: true
		})
	}
})

