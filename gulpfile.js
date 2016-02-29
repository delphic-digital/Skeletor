var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge'),
    mergeStream = require('merge-stream'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    nodeSassGlobbing = require('node-sass-globbing'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    replace = require('gulp-replace'),
    requirejsOptimize = require('gulp-requirejs-optimize'),
    mainBowerFiles = require('main-bower-files'),
    flatten = require('gulp-flatten'),
    rename = require("gulp-rename");

var paths = {
	dirs: {
    build: {
    	js: './Static/dist/js'
    }
  },
  bower: {
  	js : mainBowerFiles({filter: /.*\.js$/i}),
  	css : mainBowerFiles({filter: /.*\.css$/i}),
  }
}

var commonJsOptions  = {
	baseUrl: 'Static/src/js',
	mainConfigFile: 'Static/src/js/skeletor.main.js',
	removeCombined: true,
	optimize: 'none',
	wrapShim: true,
	preserveLicenseComments: false,
	uglify2: {
		compress: {
			drop_console : true,
			dead_code: true
		}
	},
	paths: {
		//Map all CDN paths to empty so optimizer doesn't try to include them
		jquery: "empty:",
	}
}

var moduleJsOptions = function(file) {
	var moduleName = file.relative.split('.')[0];
	return merge(commonJsOptions,{
		name: 'components/'+moduleName,
		exclude: ['skeletor.main']
	})
};


gulp.task('sass', function () {
	return gulp.src('./Static/src/scss/main.scss')
		.pipe(sass({
			importer: nodeSassGlobbing,
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(gulp.dest('./Static/dist/css'))
	.pipe(browserSync.stream());
});


gulp.task('sprite', function () {
	var spriteData = gulp.src('./Static/src/sprites/bitmaps/**/*.png').pipe(spritesmith({
		imgName: 'spritesheet.png',
		imgPath: '../../assets/spritesheets/spritesheet.png',
		cssName: '_sprites.scss'
	}));

	var imgStream = spriteData.img
	.pipe(gulp.dest('./Static/assets/spritesheets/'));

	var cssStream = spriteData.css
	.pipe(gulp.dest('./Static/src/scss/partials/base/'));

	return mergeStream(imgStream, cssStream);
});

gulp.task('svgSprite', function () {
	var config ={
		mode: {
			symbol: {
				dest: '.',
				sprite : 'svg.spritesheet.svg',
				example: {
					dest: 'svg.spritesheet.example.html'
				}
			}
		}
	}

	return gulp.src('**/*.svg', {cwd: './Static/src/sprites/vectors'})
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./Static/assets/spritesheets/'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('replace:build', function(){
	return gulp.src('index.html', { base : './' })
		.pipe(replace('/Static/src/js/', '/Static/dist/js/'))
		.pipe(gulp.dest('./'));
});


gulp.task('replace:dev', function(){
	return gulp.src('index.html', { base : './' })
		.pipe(replace('/Static/dist/js/', '/Static/src/js/'))
		.pipe(gulp.dest('./'));
});

gulp.task('scripts:main', function () {
	return gulp.src('./Static/src/js/skeletor.main.js')
		.pipe(requirejsOptimize(commonJsOptions))
		.pipe(gulp.dest('./Static/dist/js'));
});

gulp.task('scripts:components', function () {
	return gulp.src('./Static/src/js/components/*.js')
		.pipe(requirejsOptimize(moduleJsOptions))
		.pipe(gulp.dest('./Static/dist/js/components'));
});

gulp.task('watch', function(){
	gulp.watch('./Static/src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./Static/src/sprites/bitmaps/**/*.png', gulp.series('sprite'));
	gulp.watch('./Static/src/sprites/vectors/**/*.svg', gulp.series('svgSprite'));
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./Static/src/js/**/*.js', browserSync.reload);
})

gulp.task('clean:js', function () {
  return del(paths.dirs.build.js);
});

gulp.task('copy:requirejslib', function() {
	return gulp.src('./Static/src/js/lib/**/*.js')
		.pipe(gulp.dest('./Static/dist/js/lib'));
});

gulp.task('bower:process', function() {

	//console.log(paths.bower.js)
	//console.log(paths.bower.css)

	var jsStream = gulp.src(paths.bower.js)
		.pipe(flatten())
		.pipe(gulp.dest('./Static/src/js/plugins'));

	var cssStream = gulp.src(paths.bower.css)
		.pipe(flatten())
		.pipe(rename({
			prefix: "_",
			extname: ".scss"
		}))
		.pipe(gulp.dest('./Static/src/scss/partials/plugins'));


	return mergeStream(jsStream, cssStream);

});

gulp.task('scripts', gulp.parallel('scripts:main', 'scripts:components'));
gulp.task('default', gulp.parallel('replace:dev','browserSync', 'watch'));
gulp.task('build', gulp.series('clean:js',gulp.parallel('replace:build','scripts:main', 'scripts:components','copy:requirejslib')));