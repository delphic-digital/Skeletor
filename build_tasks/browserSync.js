var gulp = require('gulp');
global.browserSync = require('browser-sync').create();

var inittor;

if (global.skeletor.proxy) {
    //truthy proxy - proxy that proxy!
    inittor = function() {
        global.browserSync.init({
            proxy: global.skeletor.proxy,
            notify: false,
            ghostMode: false,
            open: false
        });
    };
} else {
    //proxy is false, serve the static files
    inittor = function() {
        global.browserSync.init({
            server: {
                baseDir: './dist' //assuming dist as there is no 'real' site it's unlikely the dist paths will have been configured yet
            }
        });
    };
}

gulp.task('browserSync', inittor);

gulp.task('browserSync:reload', function(done) {
    global.browserSync.reload();
    done();
});