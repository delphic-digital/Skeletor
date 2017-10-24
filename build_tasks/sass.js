var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            importer: require('node-sass-globbing'),
            includePaths:[].concat(
                require('bourbon').includePaths,
                './node_modules/susy/sass',
                './node_modules/breakpoint-sass/stylesheets'),
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(global.skeletor.distCssDir))
        .pipe(global.browserSync.stream({match: '**/*.css'}));
});