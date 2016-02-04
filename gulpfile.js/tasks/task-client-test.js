var karmaServer = require('karma').Server;

module.exports = function (gulp, $, config) {
  var dirs = config.dirs;
  var globs = config.globs;

  gulp.task('client:test', ['copy:index', 'build'], (done) => {
    new karmaServer({
      configFile: __dirname + '/../../karma.conf.js'
      //,singleRun: true
    }, () => done()).start();
  });
};
