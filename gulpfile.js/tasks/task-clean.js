var rimraf = require('rimraf');

module.exports = function (gulp, $, config, helpers) {
  var dirs = config.dirs;
  var globs = config.globs;

  gulp.task('clean:all', (cb) => {
    return rimraf(globs.dist, cb);
  });
}
