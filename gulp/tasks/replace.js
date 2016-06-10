var gulp = require('gulp'),
    replace = require('gulp-replace'),
    config = require('../config')

gulp.task('replace:build', function(){
	return gulp.src(config.base.baseLayoutFile, { base : config.base.baseLayoutDir })
		.pipe(replace('data-main="'+config.scripts.srcPath.substr(1), 'data-main="'+config.scripts.dest.substr(1)))
		.pipe(gulp.dest(config.base.baseLayoutDir));
});


gulp.task('replace:dev', function(){
	return gulp.src(config.base.baseLayoutFile, { base : config.base.baseLayoutDir })
		.pipe(replace('data-main="'+config.scripts.dest.substr(1), 'data-main="'+config.scripts.srcPath.substr(1)))
		.pipe(gulp.dest(config.base.baseLayoutDir));
});
