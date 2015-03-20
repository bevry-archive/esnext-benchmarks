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
					test(testName, function(){
						var m
						try {
							m = require(path)
						} catch ( err ) {
							logger.error('The test **'+testName+'** will be ignored because it failed load:', err.message)
							return
						}
						var start = microtime.nowDouble()
						var end = microtime.nowDouble() + 1.00
						var iterations = 0
						while ( microtime.nowDouble() < end ) {
							m()
							iterations++
						}
						end = microtime.nowDouble()
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
						head: ['test', 'iterations', 'iterations percent', 'iterations percent increase', 'time per iteration (ms)', 'faster than next by',  'faster than last by', 'time (ms)']
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
							report.fasterNextPercent = ''
						} else {
							report.fasterNextPercent = Math.round(
								(report.iterations / reports[index+1].iterations)*100 - 100
							)
						}

						// Compare with last report
						if ( index === reports.length - 1 ) {
							report.fasterLastPercent = ''
						} else {
							report.fasterLastPercent = Math.round(
								(report.iterations / reports[reports.length-1].iterations)*100 - 100
							)
						}

					})
					reports.forEach(function(report, index){
						// Compare with previous report
						if ( index === reports.length - 1 ) {
							report.iterationsPercentIncrease = ''
						} else {
							report.iterationsPercentIncrease = report.iterationsPercent - reports[index+1].iterationsPercent + '%'
						}
						if ( typeof report.iterationsPercent === 'number' ) {
							report.iterationsPercent += '%'
						}
						if ( typeof report.fasterNextPercent === 'number' ) {
							report.fasterNextPercent += '%'
						}
						if ( typeof report.fasterLastPercent === 'number' ) {
							report.fasterLastPercent += '%'
						}

						table.push([
							report.test,
							report.iterations,
							report.iterationsPercent,
							report.iterationsPercentIncrease,
							report.timePerIteration,
							report.fasterNextPercent,
							report.fasterLastPercent,
							report.duration
						])
					})
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

