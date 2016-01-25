var _ = require('lodash');
var browserifyIncremental = require('browserify-incremental');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');

var requireBundle = (prebundle, libs) => _.reduce(libs, (prebundle, value, key) => {
    return prebundle.require(key, {expose: value});
}, prebundle);

module.exports = function (gulp, $, config) {
    var dirs = config.dirs;
    var globs = config.globs;
    var dependencies = config.dependencies;

    var browserifyShimConfig = _.reduce(globs.scripts.shims, (obj, v, k) => {
        obj[k] = (typeof v === 'string' ? v.replace('global:', '') : v.exports);
        return obj;
    }, {});

    gulp.task('scripts:libs', () => {
        var node_modules = browserify(_.assign(
            {}
            , config.browserify
            , {
                noParse: dependencies
                , paths: config.browserifyPaths
            }))
            .require(dependencies);
        if (config.production) node_modules = node_modules.transform({global: true}, 'uglifyify');
        node_modules = node_modules.bundle();

        var commonjs = requireBundle(browserify(config.browserify), globs.scripts.commonjs)
            .bundle();

        var shim = requireBundle(browserify(config.browserify), browserifyShimConfig)
            .transform('browserify-shim')
            .bundle();

        return merge(node_modules, commonjs, shim)
            .pipe(source('vendor.min.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`))
    });

    var bundler = browserifyIncremental(`${dirs.src}/js/app.js`, _.assign({}, config.browserify, {
        paths: config.browserifyPaths
    }))
        .external(_.values(browserifyShimConfig))
        .external(_.values(globs.scripts.commonjs))
        .external(dependencies)
        .transform('babelify')
        .transform('stringify', config.stringify);

    if (config.production) bundler = bundler.transform({global: true}, 'uglifyify');

    gulp.task('scripts:local', () => {
        return bundler
            .bundle()
            .on('error', function handleError(err) {
                console.error(err.toString());
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`))
            .pipe($.livereload());
    });

    gulp.task('scripts', ['scripts:libs', 'scripts:local']);
};