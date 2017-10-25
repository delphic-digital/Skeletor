const gulp = require('gulp');

//Keeping all the fed development files together, wherever a project needs them to be
const fedSrcRoot = './src';

//Dist files may need to be split apart by type, hence no shared root variable
global.skeletor = {
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
    gulp.watch(`${global.skeletor.srcScssDir}/**/*.scss`, gulp.series('sass', 'browserSync:reload'));
    gulp.watch(`${global.skeletor.srcJsDir}/**/*.js`, gulp.series('webpack', 'browserSync:reload'));
    gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss', 'browserSync:reload'));
    gulp.watch(`${global.skeletor.srcPngDir}/**/*.png`, gulp.series('png_sprite', 'browserSync:reload'));
});

//build all the files!
gulp.task('build', gulp.series('webpack', 'svg_sprite', 'svg_inlinecss', 'png_sprite', 'sass'));

//default task watches
gulp.task('default', gulp.series('build', 'watch', 'browserSync'));