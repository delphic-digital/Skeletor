var gulp = require('gulp'),
    config = require('../config');

gulp.task('watch', function(){
	gulp.watch(config.sass.srcPath+'/**/*.scss', gulp.series('sass'));
	gulp.watch(config.sprites.bitmapSrc, gulp.series('sprite:bitmap'));
	gulp.watch(config.sprites.vectorSrc, gulp.series('sprite:vector'));
	gulp.watch(config.sprites.inlineSrc, gulp.series('svg:inline'));
	gulp.watch(config.watch.views, gulp.series('browserSync:reload'));
	gulp.watch(config.scripts.srcPath+'/**/*.js', gulp.series('browserSync:reload'));
})
