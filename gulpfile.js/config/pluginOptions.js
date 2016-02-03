/*
 * Task Plugin Options
 * ============================================================================
 */

'use strict';

var _ = require('lodash');

module.exports = (gulp, $, config) => {
    $.util.log($.util.colors.yellow('Running in ' + ($.util.env.production ? 'production' : 'development') + ' config'));
    return {
        browserify: {debug: !$.util.env.production}
        , browserifyPaths: [`${config.dirs.src}/js`, './shared']
        , stringify: ['.html']
        , production: $.util.env.production
        , dependencies: [
            'angular'
            , 'angular-animate'
            , 'angular-ui-router'
            , 'angular-material'
            , 'bluebird'
            , 'js-data'
            , 'js-data-angular'
            , 'lodash'
        ]
    }
};
