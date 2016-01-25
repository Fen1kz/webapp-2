module.exports = function (gulp, $, config, helpers) {
    var dirs = config.dirs;
    var globs = config.globs;

    gulp.task('copy:index', () => {
        return gulp.src(globs.index)
            .pipe(gulp.dest(`${dirs.dist}`))
    });

    gulp.task('copy:assets', () => {
        return gulp.src(globs.assets)
            .pipe(gulp.dest(`${dirs.dist}/assets`))
    });

    gulp.task('copy:fonts', () => {
        return gulp.src(globs.fonts)
            .pipe(gulp.dest(`${dirs.dist}/fonts`))
    });

    gulp.task('copy', ['copy:index', 'copy:assets', 'copy:fonts']);
}