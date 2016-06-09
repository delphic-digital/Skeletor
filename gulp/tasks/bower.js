var gulp = require('gulp'),
    config = require('../config'),
    mergeStream = require('merge-stream'),
    mainBowerFiles = require('main-bower-files'),
    flatten = require('gulp-flatten'),
    rename = require("gulp-rename"),
    bowerRequireJS = require('bower-requirejs');

gulp.task('bower:install', function(cb) {

	var options = {
		baseURL: config.scripts.srcPath,
  	config:  config.scripts.src,
  	exclude: ['jquery'],
  	transitive: true
	};

	bowerRequireJS(options, function (rjsConfigFromBower) {
  	console.info('------> Updated paths config in '+options.config);
  	cb();
	});


	/*var paths = {},
	    jsStream = [],
	    cssStream = [];

	paths.js = mainBowerFiles({filter: /.*\.js$/i});
	paths.css = mainBowerFiles({filter: /.*\.css$/i});

	if(paths.js.length){
		jsStream = gulp.src(paths.js)
			.pipe(flatten())
			.pipe(gulp.dest(config.scripts.srcPath+'/bower'));
	}

	if(paths.css.length){
		cssStream = gulp.src(paths.css)
			.pipe(flatten())
			.pipe(rename({
				prefix: "_",
				extname: ".scss"
			}))
			.pipe(gulp.dest(config.sass.srcPath+'/partials/bower'));
		}


	return mergeStream(jsStream, cssStream);*/

});

gulp.task('bower:requirejs', function() {



});
