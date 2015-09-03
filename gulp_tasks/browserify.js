module.exports = function gulpTaskBrowserify(gulp, gPlugins, pkg, conf){
  "use strict";

  var
    browserify = require("browserify"),
    source = require("vinyl-source-stream")
  ;

  return gulp.task("browserify", function() {
    return browserify(conf.src)
      .bundle()
      .on("error", function (err) {
        gPlugins.util.log(err.toString());
        this.emit("end");
      })
      .pipe(source(conf.output))
      .pipe(gulp.dest(conf.dest))
      .pipe(gPlugins.reload({stream:true}))
    ;
  });


};

return module.exports;
