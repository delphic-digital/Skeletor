/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulpfile/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var gulp = require('gulp');

require('require-dir')('./gulp/tasks', { recurse: true })

//Move main command tasks here so they are loaded after all the dependent tasks
gulp.task('default', gulp.parallel('replace:dev','browserSync:static', 'watch'));
gulp.task('bower:wire', gulp.parallel('bower:styles', 'bower:scripts'));
gulp.task('scripts', gulp.parallel('scripts:main', 'scripts:components'));
gulp.task('build', gulp.series('clean:js',gulp.parallel('replace:build','scripts:main', 'scripts:components')));

//gulp.task('styleguide', gulp.series('clean:styleguide','sprite:bitmap:example','styleguide:generate','styleguide:applystyles',gulp.parallel('styleguide:assets','styleguide:assets:js', 'styleguide:assets:css')));
