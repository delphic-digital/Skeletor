const gulp = require('gulp');
global.skeletor = require('./skeletor.config.js');

require('./build_tasks/browserSync.js');
require('./build_tasks/sass.js');
require('./build_tasks/webpack.js');
require('./build_tasks/svg_sprite.js');
require('./build_tasks/svg_inlinecss.js');
require('./build_tasks/png_sprite.js');
require('./build_tasks/_static_templates.js');

//Watching you work
gulp.task('watch', function(){
	gulp.watch(`${global.skeletor.srcScssDir}/**/*.scss`, gulp.series('sass:watch'));

	//TODO this a better way, I'm sure there's a better way
	if (global.skeletor.useBrowserSync) {
		gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss', 'browserSync:reload'));
		gulp.watch(`${global.skeletor.srcPngDir}/**/*.png`, gulp.series('png_sprite', 'browserSync:reload'));
	} else {
		gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss'));
		gulp.watch(`${global.skeletor.srcPngDir}/**/*.png`, gulp.series('png_sprite'));
	}

	if (global.skeletor.templateLang) { //allow it to be set to false if static markup isn't needed

		//for writing markup with server side includes. 
		if (global.skeletor.templateLang == 'ssi') {
			if (global.skeletor.useBrowserSync) {
				gulp.watch(`${global.skeletor.srcSSIDir}/**/*.html`, gulp.series('static_templates', 'browserSync:reload'));
			} else {
				gulp.watch(`${global.skeletor.srcSSIDir}/**/*.html`, gulp.series('static_templates'));
			}
		}
	
		//Pug ftw!
		if (global.skeletor.templateLang == 'pug') {
			if (global.skeletor.useBrowserSync) {
				gulp.watch(`${global.skeletor.srcPugDir}/**/*.pug`, gulp.series('static_templates', 'browserSync:reload'));
			} else {
				gulp.watch(`${global.skeletor.srcPugDir}/**/*.pug`, gulp.series('static_templates'));
			}
		}
	}
});

gulp.task('build', gulp.series('webpack:build', 'svg_sprite', 'svg_inlinecss', 'png_sprite', 'sass:build'));

if (global.skeletor.useBrowserSync) {
	//default task watches - start up browsersync then fire off all the watchers simultaniously!
	gulp.task('default', gulp.series('browserSync', gulp.parallel('webpack:watch', 'watch')));
} else {
	gulp.task('default', gulp.parallel('webpack:watch', 'watch'));
}
