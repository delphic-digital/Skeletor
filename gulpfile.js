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
    proxy: 'project.dev', //The local url where the 'real' version of the site is running
};

require('./build_tasks/browserSync.js');
require('./build_tasks/sass.js');
require('./build_tasks/js.js');
require('./build_tasks/svg_sprite.js');
require('./build_tasks/svg_inlinecss.js');
// require('build_tasks/png_sprite.js');

//Watching you work
gulp.task('watch', function(){
    gulp.watch(`${global.skeletor.srcScssDir}/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${global.skeletor.srcJsDir}/**/*.js`, gulp.series('js'));
    gulp.watch(`${global.skeletor.srcSvgDir}/**/*.svg`, gulp.series('svg_sprite', 'svg_inlinecss'));
    
    // //Sprites compile into sass, a cshtml file, and I believe a few assets for the site to load
    // //so we need to compile it, run the sass to pick that up, copy the css, copy the assets (I believe), and copy the views in
    // gulp.watch(config.devSpriteFilesDir, gulp.series('sprite:build', 'sass', 'copy:css', 'copy:assets', 'copy:views', 'browserSync:reload'));
  
    // //any html updates - don't want to do a build so just copy the cshtml files in and hope for the best!
    // gulp.watch(config.devViewsDir, gulp.series('copy:views','browserSync:reload'));
  
    // //currently the js optimization takes ages so for development we're just using the src js.
    // //this is also copying the dev js so after a build we can start devving again and see it (with npm start or npm run magic-once)
    // //(search the project for "var useDevJs =" and toggle that to switch version of the js is run on your local - don't commit that change though!)
    // gulp.watch(config.devJsFilesDir + '/**/*.js', gulp.series('copy:js', 'copy:devjs', 'browserSync:reload'));
});

//build all the files!
gulp.task('build', gulp.series('js', 'svg_sprite', 'svg_inlinecss', 'sass'));

//default task watches
gulp.task('default', gulp.series('build', 'browserSync', 'watch'));