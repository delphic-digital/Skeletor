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
    rename = require("gulp-rename"),
    styleguide = require('sc5-styleguide');

var config = require('./config.json');


var paths = {
	source: {
		js: './Static/src/js',
		scss: './Static/src/scss',
		sprites: './Static/src/sprites',
	},
	build: {
		js: './Static/dist/js',
		css: './Static/dist/css',
		sprites: './Static/assets/spritesheets',
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
	return gulp.src(paths.source.scss+'/main.scss')
		.pipe(sass({
			importer: nodeSassGlobbing,
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(gulp.dest(paths.build.css))
	.pipe(browserSync.stream());
});

gulp.task('sprite:bitmap', function () {
	var spriteData = gulp.src(paths.source.sprites+'/bitmaps/**/*.png').pipe(spritesmith({
		retinaSrcFilter: paths.source.sprites+'/bitmaps/**/*@2x.png',
		imgName: 'bitmap.spritesheet.png',
	 	retinaImgName: 'bitmap.spritesheet@2x.png',
		imgPath: '../../assets/spritesheets/bitmap.spritesheet.png',
		retinaImgPath : '../../assets/spritesheets/bitmap.spritesheet@2x.png',
		cssName: '_sprites.scss'
	}));

	var imgStream = spriteData.img
	.pipe(gulp.dest(paths.build.sprites));

	var cssStream = spriteData.css
	.pipe(gulp.dest(paths.source.scss+'/partials/base/'));

	return mergeStream(imgStream, cssStream);
});

gulp.task('sprite:bitmap:example', function () {
	var spriteData = gulp.src(paths.source.sprites+'/bitmaps/**/*.png').pipe(spritesmith({
		retinaSrcFilter: paths.source.sprites+'/bitmaps/**/*@2x.png',
		imgName: 'bitmap.spritesheet.png',
	 	retinaImgName: 'bitmap.spritesheet@2x.png',
		imgPath: '../../assets/spritesheets/bitmap.spritesheet.png',
		retinaImgPath : '../../assets/spritesheets/bitmap.spritesheet@2x.png',
		cssTemplate: paths.source.sprites+'/bitmap.example.handlebars',
		cssFormat: 'css',
		cssName: 'bitmap.example.html'
	}));

	var htmlStream = spriteData.css
	.pipe(gulp.dest(paths.build.sprites));

	return htmlStream;
});

gulp.task('sprite:vector', function () {
	var config ={
		mode: {
			symbol: {
				dest: '.',
				sprite : 'vector.spritesheet.svg',
				example: {
					template: paths.source.sprites+'/vector.example.html',
					dest: 'vector.example.html'
				}
			}
		}
	}

	return gulp.src('**/*.svg', {cwd: paths.source.sprites+'/vectors'})
		.pipe(svgSprite(config))
		.pipe(gulp.dest(paths.build.sprites));
});

gulp.task('browserSync', function() {
	browserSync.init(config.browserSync);
});

gulp.task('replace:build', function(){
	return gulp.src(config.baseLayoutFile, { base : config.baseLayoutDir })
		.pipe(replace('/Static/src/js/', '/Static/dist/js/'))
		.pipe(gulp.dest(config.baseLayoutDir));
});


gulp.task('replace:dev', function(){
	return gulp.src(config.baseLayoutFile, { base : config.baseLayoutDir })
		.pipe(replace('/Static/dist/js/', '/Static/src/js/'))
		.pipe(gulp.dest(config.baseLayoutDir));
});

gulp.task('scripts:main', function () {
	return gulp.src(paths.source.js+'/skeletor.main.js')
		.pipe(requirejsOptimize(commonJsOptions))
		.pipe(gulp.dest(paths.build.js));
});

gulp.task('scripts:components', function () {
	return gulp.src(paths.source.js+'/components/*.js')
		.pipe(requirejsOptimize(moduleJsOptions))
		.pipe(gulp.dest(paths.build.js+'/components'));
});

gulp.task('watch', function(){
	gulp.watch(paths.source.scss+'/**/*.scss', gulp.series('sass'));
	gulp.watch(paths.source.sprites+'/bitmaps/**/*.png', gulp.series('sprite:bitmap'));
	gulp.watch(paths.source.sprites+'/vectors/**/*.svg', gulp.series('sprite:vector'));
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch(paths.source.js+'/**/*.js', browserSync.reload);
})

gulp.task('clean:js', function () {
  return del(paths.build.js);
});

gulp.task('clean:styleguide', function () {
  return del('./Static/dist/styleguide');
});

gulp.task('copy:requirejslib', function() {
	return gulp.src(paths.source.js+'/lib/**/*.js')
		.pipe(gulp.dest(paths.build.js+'/lib'));
});

gulp.task('bower:process', function() {

	paths.bower.js = mainBowerFiles({filter: /.*\.js$/i});
	paths.bower.css = mainBowerFiles({filter: /.*\.css$/i});

	//console.log(paths.bower.js)
	//console.log(paths.bower.css)

	var jsStream = gulp.src(paths.bower.js)
		.pipe(flatten())
		.pipe(gulp.dest(paths.source.js+'/plugins'));

	var cssStream = gulp.src(paths.bower.css)
		.pipe(flatten())
		.pipe(rename({
			prefix: "_",
			extname: ".scss"
		}))
		.pipe(gulp.dest(paths.source.scss+'/partials/plugins'));


	return mergeStream(jsStream, cssStream);

});

//Styleguide tasks

gulp.task('styleguide:generate', function() {
	return gulp.src(paths.source.scss+'/**/*.scss')
		.pipe(styleguide.generate({
			title: 'Skeletor Styleguide',
			server: config.styleguide.server,
			port: 4000,
			disableHtml5Mode: true,
			disableEncapsulation: true,
			appRoot: '.',
			rootPath: './Static/dist/styleguide',
			overviewPath: 'README.md',
			extraHead: '<link href=" http://fonts.googleapis.com/css?family=RobotoDraft:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en" rel="stylesheet" type="text/css"><link href="/Static/src/styleguide/styleguide_overrides.css" rel="stylesheet" type="text/css">',
			afterBody:'<script data-main="/Static/src/js/skeletor.main" src="/Static/src/js/lib/require.js"></script>',
			customColors: './Static/src/styleguide/styleguide_variables.css'
		}))
		.pipe(gulp.dest('./Static/dist/styleguide'));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(paths.source.scss+'/main.scss')
		.pipe(sass({
			importer: nodeSassGlobbing,
			includePaths:[].concat(require('bourbon').includePaths, './node_modules/susy/sass', './node_modules/breakpoint-sass/stylesheets'),
			outputStyle: 'compressed'
		}))
		.pipe(styleguide.applyStyles())
		.pipe(gulp.dest('./Static/dist/styleguide'));
});

gulp.task('styleguide:assets:sprites', function() {
  return gulp.src([paths.build.sprites+'/**/*'])
  	.pipe(gulp.dest('./Static/dist/styleguide/assets/spritesheets'));
});

gulp.task('styleguide:assets:js', function() {
  return gulp.src([paths.source.js+'/**/*'])
  	.pipe(gulp.dest('./Static/dist/styleguide/Static/src/js'));
});

gulp.task('styleguide:assets:css', function() {
  return gulp.src('./Static/src/styleguide/styleguide_overrides.css')
  	.pipe(gulp.dest('./Static/dist/styleguide/Static/src/styleguide'));
});

gulp.task('watch:styleguide', function(){
	gulp.watch(paths.source.scss+'/**/*.scss', gulp.series('sass','styleguide'));
})


gulp.task('default', gulp.parallel('replace:dev','browserSync', 'watch'));
gulp.task('scripts', gulp.parallel('scripts:main', 'scripts:components'));
gulp.task('build', gulp.series('clean:js',gulp.parallel('replace:build','scripts:main', 'scripts:components','copy:requirejslib')));
gulp.task('styleguide', gulp.series('clean:styleguide','sprite:bitmap:example','styleguide:generate','styleguide:applystyles',gulp.parallel('styleguide:assets:sprites','styleguide:assets:js', 'styleguide:assets:css')));