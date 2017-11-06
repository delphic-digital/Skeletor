var gulp = require('gulp'),
	spritesmith = require('gulp.spritesmith'),
	mergeStream = require('merge-stream'),
	imageResize = require('gulp-image-resize'),
	rename = require('gulp-rename');

/**
 * Currently does not work on windows without some finagling. 
 * The goal is to only handle retina png files and have the task runner generate non retina png files
 */
gulp.task('generate_non_retina', function () {
	return gulp.src(`${global.skeletor.srcPngDir}/**/*.png`)
		.pipe(imageResize({
			percentage: 50
		}))
		.pipe(rename((path) => {
			path.extname = '@half.png';
		}))
		.pipe(gulp.dest(global.skeletor.srcPngDir));
});

gulp.task('generate_png_sprite', function () {
	var spriteData = gulp.src(`${global.skeletor.srcPngDir}/**/*@half.png`)
		.pipe(spritesmith({
			retinaSrcFilter: `${global.skeletor.srcPngDir}/**/*.png`,
			imgName: 'pngSprite@half.png',
			retinaImgName: 'pngSprite.png',
			imgPath: `${global.skeletor.distCssPngSpriteDirUrl}/pngSprite@half.png`,
			retinaImgPath : `${global.skeletor.distCssPngSpriteDirUrl}/pngSprite.png`,
			cssName: '_png.scss'
		}));

	var imgStream = spriteData.img
		.pipe(gulp.dest(global.skeletor.distSpritePngDir));

	var cssStream = spriteData.css
		.pipe(gulp.dest(`${global.skeletor.srcScssDir}/abstracts/`));

	return mergeStream(imgStream, cssStream);
});

gulp.task('png_sprite', gulp.series('generate_non_retina', 'generate_png_sprite'));