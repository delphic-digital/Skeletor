var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    mergeStream = require('merge-stream');

/**
* This ...
*/

gulp.task('png_sprite', function () {
    var spriteData = gulp.src(`${global.skeletor.srcPngDir}/**/*.png`)
        .pipe(spritesmith({
            imgName: 'pngSprite.png',
            imgPath: `${global.skeletor.distCssPngSpriteDirUrl}/pngSprite.png`,
            cssName: '_png.scss'
        }));

    var imgStream = spriteData.img
        .pipe(gulp.dest(global.skeletor.distSpritePngDir));

    var cssStream = spriteData.css
        .pipe(gulp.dest(`${global.skeletor.srcScssDir}/abstracts/`));

    return mergeStream(imgStream, cssStream);
});
