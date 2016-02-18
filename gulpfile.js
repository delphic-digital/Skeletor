var gulp = require('gulp'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith');

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

//Sprite
gulp.task('sprite', function () {
	var spriteData = gulp.src('./Static/src/sprites/bitmaps/*').pipe(spritesmith({
		imgName: 'spritesheet.png',
		imgPath: '../../assets/spritesheets/spritesheet.png',
		cssName: '_sprites.scss'
	}));

	var imgStream = spriteData.img
	.pipe(gulp.dest('./Static/assets/spritesheets/'));

	var cssStream = spriteData.css
	.pipe(gulp.dest('./Static/src/scss/partials/base/'));

	return merge(imgStream, cssStream);
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
