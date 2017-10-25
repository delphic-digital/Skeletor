const gulp = require('gulp');

//Keeping all the fed development files together, wherever a project needs them to be
const fedSrcRoot = './src';

//Dist files may need to be split apart by type, hence no shared root variable
global.skeletor = {
    useBrowserSync: true,
    srcJsDir: `${fedSrcRoot}/js`,
    srcScssDir: `${fedSrcRoot}/scss`,
    srcSvgDir: `${fedSrcRoot}/sprite_svg`,
    srcPngDir: `${fedSrcRoot}/sprite_png`,
    distJsDir: './dist/js',
    distCssDir: './dist/css',
    distSpriteSvgDir: './dist/sprite',
    distSpritePngDir: './dist/sprite',
    proxy: false, //The local url where the 'real' version of the site is running. Or false to serve the static files form ./dist
    distCssPngSpriteDirUrl: '../../assets/spritesheets' //for the dist css's url('...') - will be specific to each project
};

require('./build_tasks/browserSync.js');
require('./build_tasks/sass.js');
require('./build_tasks/webpack.js');
require('./build_tasks/svg_sprite.js');
require('./build_tasks/svg_inlinecss.js');
require('./build_tasks/png_sprite.js');

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
});

gulp.task('build', gulp.series('webpack:build', 'svg_sprite', 'svg_inlinecss', 'png_sprite', 'sass:build'));

if (global.skeletor.useBrowserSync) {
    //default task watches - start up browsersync then fire off all the watchers simultaniously!
    gulp.task('default', gulp.series('browserSync', gulp.parallel('webpack:watch', 'watch')));
} else {
    gulp.task('default', gulp.parallel('webpack:watch', 'watch'));
}