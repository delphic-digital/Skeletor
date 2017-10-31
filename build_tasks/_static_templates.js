var gulp = require('gulp');
var pug = require('gulp-pug');
var ssi = require('gulp-ssi');

if (global.skeletor.templateLang === 'pug') {
	gulp.task('static_templates', function buildHTML() {
		return gulp.src(`${global.skeletor.srcPugDir}/*.pug`)
			.pipe(pug({
				pretty: '\t'
			}))
			.pipe(gulp.dest(global.skeletor.distTemplateDir));
	});
}

if (global.skeletor.templateLang === 'ssi') {
	gulp.task('static_templates', function buildHTML() {
		return gulp.src(`${global.skeletor.srcSSIDir}/*.html`)
			.pipe(ssi())
			.pipe(gulp.dest(global.skeletor.distTemplateDir));
	});
}
