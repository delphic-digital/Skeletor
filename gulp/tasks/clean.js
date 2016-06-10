var gulp = require('gulp'),
    del = require('del'),
    config = require('../config');

gulp.task('clean:js', function () {
  return del([config.scripts.dest+'/**', '!'+config.scripts.dest, '!'+config.scripts.dest+'/lib', '!'+config.scripts.dest+'/lib/require.js']);
});

/*gulp.task('clean:styleguide', function () {
  return del('./Static/dist/styleguide');
});*/
