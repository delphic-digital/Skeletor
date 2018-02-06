var gulp = require('gulp'),
	inlineSvg = require('gulp-inline-svg');

/**
* This creates an scss file that provides mixins for generating svg css backgrounds
*/
gulp.task('svg_inlinecss', function() {
	return gulp.src(`${global.skeletor.srcSvgDir}/**/*.svg`)
		.pipe(inlineSvg({
			template: `${global.skeletor.srcSvgDir}/_inline.mustache`
		}))
		.pipe(gulp.dest(`${global.skeletor.srcScssDir}/_utilities/`)); //_inline-svg.scss
});