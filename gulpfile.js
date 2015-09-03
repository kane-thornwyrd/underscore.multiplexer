var
  gulp = require('gulp'),
  conf = require('./gulpconf.json'),
  pkg = require('./package.json')
;

var globalPlugins = require('gulp-packages')(gulp, [
  'environments as env',
  'foreach',
  'rename',
  'concat',
  'util'
]);

globalPlugins.browserSync = require('browser-sync');
globalPlugins.reload = globalPlugins.browserSync.reload;

globalPlugins._ = require('underscore');

globalPlugins.env.staging = globalPlugins.env.make("staging");

function loadTask(taskName){
  "use strict";
  require('./gulp_tasks/' + taskName)(gulp, globalPlugins, pkg, conf[taskName]);
}

function watchTask(taskName){
  "use strict";
  if(typeof conf[taskName].watch !== 'undefined'){
    gulp.watch(conf[taskName].watch, [taskName]);
  }
}

loadTask('documentation');
loadTask('javascript');
loadTask('copyToTest');

gulp.task('watch', ['javascript', 'copyToTest', 'documentation' ] ,function() {
  "use strict";

  var lconf = conf.watch;

  globalPlugins.browserSync({
    server: {
      baseDir: lconf.root,
      index: lconf.index
    }
  });

  watchTask('javascript');
  watchTask('copyToTest');
  watchTask('documentation');
});
