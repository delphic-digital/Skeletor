var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

//Compile SASS
gulp.task('sass', function () {
	return gulp.src('./Static/src/scss/main.scss')
		.pipe(sass({
			importer: require('node-sass-globbing'),
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./Static/dist/css'))
	.pipe(browserSync.stream());
});

//Browser Sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

//Watch
gulp.task('dev',['browserSync', 'sass'], function(){
	gulp.watch('./Static/src/scss/**/*.scss', ['sass']);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./Static/src/js/**/*.js', browserSync.reload);
})
