var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
	return gulp.src(`${global.skeletor.srcPugDir}/*.pug`)
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(global.skeletor.distPugDir));
});