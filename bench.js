"use strict"
require('coffee-script/register')
var joe = require('joe')
var microtime = require('microtime')
var pathUtil = require('path')
var scandir = require('scandirectory')
var featuresPath = __dirname+'/features'
var Table = require('cli-table')
var Logdown = require('logdown')
var logger = new Logdown()
var testDuration = 5*1000

scandir({
	path: featuresPath,
	recurse: true,
	next: function(err, list, features){
		Object.keys(features).forEach(function(featureName){
			// Create the benchmarks suite for the featureName
			joe.suite(featureName, function(suite,test){
				var reports = []
				var totalDuration = 0
				var totalIterations = 0
				// Add the tests for the featureName
				Object.keys(features[featureName]).forEach(function(testFile){
					var path = pathUtil.join(featuresPath, featureName, testFile)
					var testName = testFile.split('.')[0]
					var m = require(path)
					test(testName, function(){
						var start = microtime.now()
						var end = microtime.now() + testDuration
						var iterations = 0
						while ( microtime.now() < end ) {
							m()
							iterations++
						}
						end = microtime.now()
						var duration = end - start
						reports.push({
							feature: featureName,
							test: testName,
							iterations: iterations,
							duration: duration
						})
						totalIterations += iterations
						totalDuration += duration
					})
				})
				test('report', function(){
					var table = new Table({
						head: ['test', 'time (ms)', 'iterations', 'iterations percent', 'time per iteration (ms)', 'faster than next by',  'faster than last by']
					})
					reports = reports.sort(function(a,b){
						return a.iterations < b.iterations
					})
					var names = []
					reports.forEach(function(report, index){
						names.push('**'+report.test+'**')
						report.iterationsPercent = Math.round(
							(report.iterations / totalIterations)*100
						)
						report.timePerIteration = Math.round(
							report.duration / report.iterations
						)

						// Compare with previous report
						if ( index === reports.length - 1 ) {
							report.fasterNextPercent = 0
						} else {
							report.fasterNextPercent = Math.round(
								(report.iterations / reports[index+1].iterations)*100 - 100
							)
						}

						// Compare with last report
						if ( index === reports.length - 1 ) {
							report.fasterLastPercent = 0
						} else {
							report.fasterLastPercent = Math.round(
								(report.iterations / reports[reports.length-1].iterations)*100 - 100
							)
						}

						table.push([
							report.test,
							report.duration,
							report.iterations,
							report.iterationsPercent+'%',
							report.timePerIteration,
							report.fasterNextPercent+'%',
							report.fasterLastPercent+'%'
						])
					})

					table.push(['Total', totalDuration, totalIterations, '', '', ''])
					console.log('')
					logger.info('Results of the **'+featureName+'** feature (the more iterations the better):')
					console.log(table.toString())
					logger.info('Fastest to slowest: '+names.join(', '))
					console.log('')
				})
			})
		})
	}
})

