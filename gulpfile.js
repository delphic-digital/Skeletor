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
gulp.task('default', gulp.parallel('browserSync:static', 'watch'));
//gulp.task('scripts', gulp.parallel('scripts:main', 'scripts:components'));
