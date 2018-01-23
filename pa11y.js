// An example of running Pa11y programmatically
'use strict';

var pa11y = require('pa11y');
var skeletorConfig = require('./skeletor.config.js');
var cliReporter = require('pa11y/reporter/cli');
var htmlReporter = require('pa11y/reporter/html');
var fs = require('fs');
var opn = require('opn');

// Create a test instance with some default options
var test = pa11y({
	// Log what's happening to the console
	log: {
		debug: console.log.bind(console),
		error: console.error.bind(console),
		info: console.log.bind(console)
	}

});

test.run(skeletorConfig.localUrl, function(error, result) {
	if (error) {
		return console.error(error.message);
	}

	console.log(cliReporter.results(result, skeletorConfig.localUrl));
	var html = htmlReporter.process(results, skeletorConfig.localUrl);
	fs.writeFile('./a11y-results.html', html, function(err) {
		if(err) {
			return console.log(err);
		}
		opn('./a11y-results.html');
	}); 
});
