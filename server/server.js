'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var $log = require('intel').getLogger('app');

var logger = require("./utils/logger");
var config = require("./config");

var port = process.env.PORT || 3000;

var app = express()
    .use(function(req, res, next) {
        $log.info(req.method, req.url);
        next();
    })
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(express.static('client'))
    .use('/', require('./api/api.ctrl').createRouter())
    .use('/', require('./api/auth.ctrl').createRouter())
    .listen(port);

$log.info('Magic happens at http://localhost:' + port);
