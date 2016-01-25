'use strict';

let _ = require('lodash');
let gulp = require('gulp');
let gulpPlugins = require('gulp-load-plugins')();
let tasks = require('require-dir')('./tasks');
let config = require('./config');

let localPlugins = require('require-dir')('./plugins');

Object.keys(localPlugins)
    .forEach((key) => gulpPlugins[_.camelCase(key)] = localPlugins[key].default(gulp, gulpPlugins, config));

Object.keys(tasks)
    .map((key) => tasks[key].default)
    .filter((obj) => typeof obj === 'function')
    .forEach((task) => task(gulp, gulpPlugins, config));
