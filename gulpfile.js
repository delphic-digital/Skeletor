var gulp = require('gulp'),
    sass = require('gulp-sass'),
    nodeSassGlobbing = require('node-sass-globbing'),
    bourbon =

gulp.task('sass', function () {
	return gulp.src('./Static/src/scss/main.scss')
		.pipe(sass({
			importer: nodeSassGlobbing,
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./Static/dist/css'));
});