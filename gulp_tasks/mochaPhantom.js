module.exports = function gulpTaskMochaPhantom(gulp, gPlugins, pkg, conf){
  "use strict";

  var mP = require("gulp-mocha-phantomjs");

  return gulp.task('mochaPhantom', function() {
    gulp.src(conf.src).pipe(mP());
  });
};

return module.exports;
