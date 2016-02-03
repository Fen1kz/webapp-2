module.exports = function (gulp, $, config) {
  var dirs = config.dirs;
  var globs = config.globs;

  gulp.task('dist', $.sequence('clean:all', ['copy', 'build', 'scripts', 'styles']));

  gulp.task('build', ['scripts:local', 'styles:local']);

  gulp.task('watch', () => {
    $.livereload.listen(function (err) {
      if (err) return console.log(err);
    });
    $.watch(globs.src, {
      readDelay: 200
      , verbose: true
    }, () => {
      $.sequence(['copy:index', 'build'], 'reload')();
    });
  });

  gulp.task('reload', () => {
    $.livereload.changed();
  });
}
