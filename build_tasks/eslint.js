var gulp = require('gulp'), 
	eslint = require('gulp-eslint');

gulp.task('eslint', function(){
	return gulp.src(`${global.skeletor.srcJsDir}/**/*.js`)
		.pipe(eslint())
		.pipe(eslint.format('codeframe'));
});