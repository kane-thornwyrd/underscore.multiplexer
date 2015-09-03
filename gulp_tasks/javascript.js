module.exports = function gulpTaskJavascript(gulp, gPlugins, pkg, conf){
  "use strict";


  var lPlugs = require('gulp-packages')(gulp, [
    'cog',
    'sourcemaps',
    'uglify'
  ]);

  var jsName = pkg.main.split(/^(.+)\.js$/i)[1];

  return gulp.task('javascript', function() {
    // Include all files you want cog to know about in the pipeline
    gulp.src(conf.src)
      // Select the files cog should look for includes in.
      // This will also filter the stream to match the glob provided
      .pipe(lPlugs.cog(conf.masterName))
      // Loop over the filtered files
      .pipe(gPlugins.foreach(function(stream, masterFile) {
        return stream
          .pipe(lPlugs.cog.includes())
          .pipe(gPlugins.concat(masterFile.relative))
        ;
      }))
      .pipe(lPlugs.uglify(conf.uglify.cleanConf))
      .on('error', gPlugins.util.log)
      .pipe(gPlugins.rename({ basename: jsName }))
      .pipe(gulp.dest(conf.dest))
      .pipe(lPlugs.sourcemaps.init(conf.sourcemaps.conf))
      .pipe(lPlugs.uglify(conf.uglify.minConf))
      .on('error', gPlugins.util.log)
      .pipe(gPlugins.rename({ extname: conf.minExt }))
      .pipe(gulp.dest(conf.dest))
      .pipe(lPlugs.sourcemaps.write(conf.sourcemaps.dest))
      .pipe(gulp.dest(conf.dest))
      .pipe(gPlugins.reload({ stream:true }))
    ;

  });

};

return module.exports;
