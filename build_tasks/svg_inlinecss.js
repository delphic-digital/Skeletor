var gulp = require('gulp'),
    inlineSvg = require('gulp-inline-svg'),
    svgmin = require('gulp-svgmin');

/**
* This creates an scss file that provides mixins for generating svg css backgrounds
*/
gulp.task('svg_inlinecss', function() {
    return gulp.src(`${global.skeletor.srcSvgDir}/**/*.svg`)
        .pipe(svgmin())
        .pipe(inlineSvg({
            template: `${global.skeletor.srcSvgDir}/_inline.mustache`
        }))
        .pipe(gulp.dest(`${global.skeletor.srcScssDir}/abstracts/`)); //_inline-svg.scss
});