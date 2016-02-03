'use strict';

var _ = require('lodash');
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var tasks = require('require-dir')('./tasks');
var localPlugins = require('require-dir')('./plugins');

var config = require('./config')(gulp, gulpPlugins);

Object.keys(localPlugins)
  .map((key) => gulpPlugins[_.camelCase(key)] = localPlugins[key](gulp, gulpPlugins, config));

Object.keys(tasks)
  .map((key) => tasks[key])
  .filter((obj) => typeof obj === 'function')
  .forEach((task) => task(gulp, gulpPlugins, config));
