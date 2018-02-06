const gulp = require('gulp');
global.skeletor = require('./skeletor.config.js');

require('./build_tasks/browserSync.js');
require('./build_tasks/sass.js');
require('./build_tasks/webpack.js');
require('./build_tasks/svg_sprite.js');
require('./build_tasks/svg_inlinecss.js');

//Watching you work
gulp.task('watch', function(){
	gulp.watch(`${global.skeletor.srcScssDir}/**/*.scss`, gulp.series('sass:watch'));

	//TODO this a better way, I'm sure there's a better way
	if (global.skeletor.useBrowserSync) {
		gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss', 'browserSync:reload'));
	} else {
		gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss'));
	}
});

gulp.task('build', gulp.series('webpack:build', 'svg_sprite', 'svg_inlinecss', 'sass:build'));

if (global.skeletor.useBrowserSync) {
	//default task watches - start up browsersync then fire off all the watchers simultaniously!
	gulp.task('default', gulp.series('browserSync', gulp.parallel('webpack:watch', 'watch')));
} else {
	gulp.task('default', gulp.parallel('webpack:watch', 'watch'));
}
