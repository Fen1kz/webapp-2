'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var $log = require('intel').getLogger('app');

var logger = require("./utils/logger");
var config = require("./config");

var port = process.env.PORT || 3001;

var app = express()
  .use(express.static('client'))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use(function (req, res, next) {
    $log.info(req.method, req.url, (req.body && Object.keys(req.body).length? req.body : ''));
    next();
  })
  .use('/', require('./api/api.ctrl').createRouter())
  .use('/', require('./api/auth.ctrl').createRouter())
  .use(function(err, req, res, next) {
    if (Array.isArray(err)) {
      res.status(err[0]).json(err[1]);
    } else if (typeof err === 'object') {
      $log.error(err);
      res.status(400).json({
        name: err.name
        , message: err.message
      });
    }
  })
  .listen(port);

$log.info('Magic happens at http://localhost:' + port);
