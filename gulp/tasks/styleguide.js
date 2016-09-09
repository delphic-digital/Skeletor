var gulp = require('gulp'),
    config = require('../config').sass,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

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

gulp.task('styleguide:assets', function() {
  return gulp.src(['./Static/assets/**/*'])
  	.pipe(gulp.dest('./Static/dist/styleguide/assets'));
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
