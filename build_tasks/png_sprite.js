var gulp = require('gulp'),
    config = require('../config'),
    spritesmith = require('gulp.spritesmith'),
    mergeStream = require('merge-stream');


/**
* This creates a _sprites.scss file that sits in with the rest of the sass
*/
gulp.task('png_sprite', function () {
    var spriteData = gulp.src(config.devSpriteFilesDir + 'bitmaps/**/*.png').pipe(spritesmith({
        retinaSrcFilter: config.devSpriteFilesDir + 'bitmaps/**/*@2x.png',
        imgName: 'bitmap.spritesheet.png',
        retinaImgName: 'bitmap.spritesheet@2x.png',
        imgPath: '../../assets/spritesheets/bitmap.spritesheet.png',
        retinaImgPath : '../../assets/spritesheets/bitmap.spritesheet@2x.png',
        cssName: '_sprites.scss'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest(config.compileSpriteFilesDir));

    var cssStream = spriteData.css
        .pipe(gulp.dest(config.devSassFilesDir + 'partials/_svgenerated/'));

    return mergeStream(imgStream, cssStream);
});