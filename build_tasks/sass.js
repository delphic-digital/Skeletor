var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    cssNext = require('postcss-cssnext'),
    cssnano = require('cssnano'),
    sourcemaps = require('gulp-sourcemaps');

var sassSettings = {
    outputStyle: 'nested',
    importer: require('node-sass-globbing'),
    includePaths:[].concat(
        require('bourbon').includePaths,
        './node_modules/susy/sass',
        './node_modules/breakpoint-sass/stylesheets'),
};

var postcssPlugins = [
    cssNext(),
    cssnano({ autoprefixer: false }) //already included in postcss-cssNext
];

gulp.task('sass:watch', function () {
    return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass(sassSettings).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('./'))
        .pipe(global.browserSync.stream({match: '**/*.css'}));
});

gulp.task('sass:build', function () {
    return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass(sassSettings).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(global.skeletor.distCssDir));
});