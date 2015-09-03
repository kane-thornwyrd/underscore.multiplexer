module.exports = function gulpTaskCopyToTest(gulp, gPlugins, pkg, conf){
  "use strict";
  conf.src = gPlugins._.template(conf.src)(pkg);

  gPlugins.util.log(conf.src);

  return gulp.task('copyToTest', function() {
    gulp
      .src(conf.src)
      .pipe(gulp.dest(conf.dest))
      .pipe(gPlugins.reload({ stream:true }))
    ;
  });
};

return module.exports;
