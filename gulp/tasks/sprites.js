var gulp = require('gulp'),
    config = require('../config'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    inlineSvg = require("gulp-inline-svg"),
    mergeStream = require('merge-stream');

gulp.task('sprite:bitmap', function () {
	var spriteData = gulp.src(config.sprites.bitmapSrc).pipe(spritesmith(config.sprites.spritesmith));

	var imgStream = spriteData.img
	.pipe(gulp.dest(config.sprites.dest));

	var cssStream = spriteData.css
	.pipe(gulp.dest(config.sass.srcPath+'/partials/base/'));

	return mergeStream(imgStream, cssStream);
});

gulp.task('sprite:vector', function () {

	return gulp.src(config.sprites.vectorSrc)
		.pipe(svgSprite(config.sprites.svgSprite))
		.pipe(gulp.dest(config.sprites.dest));
});

gulp.task('svg:inline', function() {

	return gulp.src(config.sprites.inlineSrc)
		.pipe(inlineSvg(config.sprites.inlineSvg))
		.pipe(gulp.dest(config.sass.srcPath+'/partials/base/'));
});
