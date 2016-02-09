var throughPipes = require('through-pipes');

module.exports = function (gulp, $, config) {
  var dirs = config.dirs;
  var globs = config.globs;

  var compileMinify = () => (throughPipes((readable) => (readable
      .pipe($.sourcemaps.init())
      .pipe($.if('*.scss', $.sass().on('error', $.sass.logError)))
      .pipe($.cssnano({
        zindex: false
      }))
      .pipe($.sourcemaps.write())
  )));

  gulp.task('styles:local', () => {
    return gulp.src(globs.styles.local)
      .pipe(compileMinify())
      .pipe($.concat('style.min.css'))
      .pipe(gulp.dest(`${dirs.dist}/css`))
  });

  gulp.task('styles:vendor', () => {
    var glob = [].concat(globs.styles.extension, globs.styles.vendor);
    return gulp.src(glob)
      .pipe($.expectFile({reportUnexpected: false}, globs.styles.vendor))
      .pipe(compileMinify())
      .pipe($.concat('vendor.min.css'))
      .pipe(gulp.dest(`${dirs.dist}/css`))
  });

  gulp.task('styles', ['styles:local', 'styles:vendor']);
}
