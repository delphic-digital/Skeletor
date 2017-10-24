var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin');


/**
* This creates an svg file of any name you wish to be <use>d on the site
*/
gulp.task('svg_sprite', function () {
    return gulp.src(`${global.skeletor.srcSvgDir}/**/*.svg`)
        .pipe(svgSprite({
            svg:{
                rootAttributes: {width: 0, height: 0, display: 'none'},
                xmlDeclaration: false,
                doctypeDeclaration: false
            },
            mode: {
                symbol: {
                    dest: '.',
                    sprite : '_SvgSprite.cshtml',
                    example: null
                }
            }
        }))
        .pipe(gulp.dest(global.skeletor.distSpriteSvgDir));
});
