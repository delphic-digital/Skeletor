var gulp = require('gulp'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    nodeSassGlobbing = require('node-sass-globbing'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite');

//Compile SASS
gulp.task('sass', function () {
	return gulp.src('./Static/src/scss/main.scss')
		.pipe(sass({
			importer: nodeSassGlobbing,
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./Static/dist/css'))
	.pipe(browserSync.stream());
});

//Sprite
gulp.task('sprite', function () {
	var spriteData = gulp.src('./Static/src/sprites/bitmaps/**/*.png').pipe(spritesmith({
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

//SVG Sprite
gulp.task('svgSprite', function () {
	var config ={
		mode: {
			symbol: {
				dest: '.',
				sprite : 'svg.spritesheet.svg',
				example: {
					dest: 'svg.spritesheet.example.html'
				}
			}
		}
	}

	return gulp.src('**/*.svg', {cwd: './Static/src/sprites/vectors'})
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./Static/assets/spritesheets/'));
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
gulp.task('watch', function(){
	gulp.watch('./Static/src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./Static/src/sprites/bitmaps/**/*.png', gulp.series('sprite'));
	gulp.watch('./Static/src/sprites/vectors/**/*.svg', gulp.series('svgSprite'));
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./Static/src/js/**/*.js', browserSync.reload);
})

gulp.task('default', gulp.parallel('browserSync', 'watch'))