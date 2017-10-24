var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

global.browserSync = browserSync;

gulp.task('browserSync:reload', function(done) {
    global.browserSync.reload();
    done();
});

gulp.task('browserSync', function() {
    global.browserSync.init({
        proxy: global.skeletor.proxy,
        notify: false,
        ghostMode: false,
        open: false
    });
});