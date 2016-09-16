var gulp = require('gulp'),
		config = require('../config'),
		mergeStream = require('merge-stream'),
		mainBowerFiles = require('main-bower-files'),
		flatten = require('gulp-flatten'),
		rename = require("gulp-rename"),
		bowerRequireJS = require('bower-requirejs'),
		wiredep = require('wiredep').stream;

gulp.task('bower:styles', function() {

	return gulp.src(config.sass.src)
		.pipe(wiredep({
			exclude: ['jquery'],
			fileTypes: {
				scss: {
					block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
					detect: {
						css: /@import\s['"](.+css)['"]/gi,
						scss: /@import\s['"](.+scss)['"]/gi
					},
					replace: {
						css: function (filePath) {
							return '@import "' + filePath.substr(0, filePath.lastIndexOf('.')) + '";';
						},
						scss: function (filePath) {
							return '@import "' + filePath.substr(0, filePath.lastIndexOf('.')) + '";';
						},
					}
    		}
    	},
		}))
		.pipe(gulp.dest(config.sass.srcPath))
});

gulp.task('bower:scripts', function(cb) {

	var options = {
		baseURL: config.scripts.srcPath,
		config:  config.scripts.src,
		exclude: ['jquery'],
		transitive: true,
		shim: true,
		"exclude-dev": true
	};

	bowerRequireJS(options, function (rjsConfigFromBower) {
		console.info('------> Updated paths config in '+options.config);
		cb();
	})

});
