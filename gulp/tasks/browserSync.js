var gulp = require('gulp'),
    config = require('../config.js').browserSync,
    path = require("path"),
    ssi = require('browsersync-ssi'),
    browserSync = require('browser-sync').create();

global.browserSync = browserSync;

gulp.task("browserSync:reload", function(done) {
  global.browserSync.reload();
  done();
});

gulp.task('browserSync:static', function() {
	config.static.server.middleware = ssi({baseDir: path.resolve(__dirname, '..', '..'), ext: '.html'});
	global.browserSync.init(config.static);
});

gulp.task('browserSync:dynamic', function() {
	global.browserSync.init(config.dynamic);
});

/*gulp.task('browserSync:dynamic', function() {
	global.browserSync.init(config.dynamic);
});
*/
