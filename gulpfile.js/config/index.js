/*
 * Project configuration module index.
 * ============================================================================
 */

'use strict';

var _ = require('lodash');

module.exports = (gulp, $) => {
    var config = {
        dirs: require('./dirs')
        , globs: require('./globs')
    };
    return _.assign(config, require('./pluginOptions')(gulp, $, config));
};