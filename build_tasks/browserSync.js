var gulp = require('gulp');
global.browserSync = require('browser-sync').create();

var bsyncConfig;

if (global.skeletor.proxy) {
	//truthy proxy - proxy that proxy!
	bsyncConfig = {
		proxy: global.skeletor.proxy,
		notify: false,
		ghostMode: false,
		open: false
	};
} else {
	//proxy is false, serve the static files
	bsyncConfig = {
		server: {
			baseDir: './dist', //assuming dist as there is no 'real' site it's unlikely the dist paths will have been configured yet
		},
		open: false
	};
}

gulp.task('browserSync', function(done){
	global.browserSync.init(bsyncConfig);
	done();
});

gulp.task('browserSync:reload', function(done){
	global.browserSync.reload();
	done();
});