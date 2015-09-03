module.exports = function gulpTaskDocumentation(gulp, gPlugins, pkg, conf){
  "use strict";

  return gulp.task('documentation', function() {
    require('./clean')(conf.cleanGlob);
    require('child_process').exec(conf.cmd, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('Docco error: ', error);
      }
    });
  });

};

return module.exports;
