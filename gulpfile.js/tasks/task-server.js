module.exports = function (gulp, $, config) {
  gulp.task('server', function () {
    $.foreman();
  });
};
