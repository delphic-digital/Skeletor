var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
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

if (global.skeletor.useBrowserSync) {
    gulp.task('sass:watch', function () {
        return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
            .pipe(sassLint({
                configFile: './.sass-lint.yml'
            }))
            .pipe(sassLint.format())
            .pipe(sourcemaps.init())
            .pipe(sass(sassSettings).on('error', sass.logError))
            .pipe(postcss(postcssPlugins))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(global.skeletor.distCssDir))
            .pipe(global.browserSync.stream({match: '**/*.css'}));
    });
} else {
    gulp.task('sass:watch', function () {
        return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
            .pipe(sassLint({
                configFile: './.sass-lint.yml'
            }))
            .pipe(sassLint.format())
            .pipe(sourcemaps.init())
            .pipe(sass(sassSettings).on('error', sass.logError))
            .pipe(postcss(postcssPlugins))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(global.skeletor.distCssDir));
    });
}

gulp.task('sass:build', function () {
    return gulp.src(`${global.skeletor.srcScssDir}/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass(sassSettings).on('error', sass.logError))
        .pipe(postcss(postcssPlugins))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(global.skeletor.distCssDir));
});