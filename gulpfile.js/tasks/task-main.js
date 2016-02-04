module.exports = function (gulp, $, config) {
  gulp.task('dev', $.sequence(['server', 'dist'], 'watch'));
};
