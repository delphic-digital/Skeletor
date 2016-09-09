var gulp = require('gulp'),
    config = require('../config').scripts,
    merge = require('merge'),
    requirejsOptimize = require('gulp-requirejs-optimize');


gulp.task('scripts:main', function () {
	return gulp.src(config.src)
		.pipe(requirejsOptimize(config.settings))
		.pipe(gulp.dest(config.dest));
});

var moduleJsOptions = function(file) {
	var moduleName = file.relative.split('.')[0];

	return merge(config.settings,{
		name: 'components/'+moduleName,
		exclude: [config.basename]
	})
}

gulp.task('scripts:components', function () {
	return gulp.src(config.srcPath+'/components/*.js')
		.pipe(requirejsOptimize(moduleJsOptions))
		.pipe(gulp.dest(config.dest+'/components'));
});