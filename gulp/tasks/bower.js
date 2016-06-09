var gulp = require('gulp'),
		config = require('../config'),
		mergeStream = require('merge-stream'),
		mainBowerFiles = require('main-bower-files'),
		flatten = require('gulp-flatten'),
		rename = require("gulp-rename"),
		bowerRequireJS = require('bower-requirejs'),
		wiredep = require('wiredep').stream,
		moduleImporter  = require('sass-module-importer');

gulp.task('bower:styles', function() {

	return gulp.src(config.sass.src)
		.pipe(wiredep({
			exclude: ['jquery'],
		}))
		.pipe(gulp.dest(config.sass.srcPath))
});

gulp.task('bower:scripts', function(cb) {

	var options = {
		baseURL: config.scripts.srcPath,
		config:  config.scripts.src,
		exclude: ['jquery'],
		transitive: true
	};

 	bowerRequireJS(options, function (rjsConfigFromBower) {
		console.info('------> Updated paths config in '+options.config);
		cb();
	})

});
