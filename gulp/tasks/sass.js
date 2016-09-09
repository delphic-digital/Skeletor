var gulp = require('gulp'),
    config = require('../config').sass,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest))
		.pipe(global.browserSync.stream({match: '**/*.css'}));
});
