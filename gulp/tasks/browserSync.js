var gulp = require('gulp'),
    config = require('../config.js').browserSync,
    path = require("path"),
    ssi = require('browsersync-ssi'),
    Liquid = require("liquid-node"),
    nodeify = require("nodeify"),
    browserSync = require('browser-sync').create();

    var engine = new Liquid.Engine;
    //engine.registerFileSystem(new Liquid.LocalFileSystem(path.resolve(__dirname, '..', '../Views')));
    engine.registerFileSystem(new Liquid.LocalFileSystem("./"));

global.browserSync = browserSync;

gulp.task("browserSync:reload", function(done) {
  global.browserSync.reload();
  done();
});

gulp.task('browserSync:static', function() {
	//config.static.server.middleware = ssi({baseDir: path.resolve(__dirname, '..', '..'), ext: '.html'});

	config.static.open=false;

	config.static.server.middleware = function (req, res, next) {
		var fs = require('fs');
		var ext = '.html';
		var baseDir = path.resolve(__dirname, '..', '..');
		var file = req.url === '/' ? ('/index' + ext) : req.url;
    var pathname = path.join(baseDir, require('url').parse(file).pathname);

    if (path.extname(pathname) === ext && fs.existsSync(pathname)) {
     // var contents = fs.readFileSync(pathname).toString();console.log(contents)
      engine.fileSystem.readTemplateFile('index').then(function (src) {
				var context = {};
				engine.parseAndRender(src, context).then(function(result) {
	 		 	 res.write(result);
	     	 res.end();
	 		 })
			});

    } else {
      next();
    }
	};

	global.browserSync.init(config.static);
});

gulp.task('browserSync:dynamic', function() {
	global.browserSync.init(config.dynamic);
});

/*gulp.task('browserSync:dynamic', function() {
	global.browserSync.init(config.dynamic);
});
*/
