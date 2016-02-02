'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var $log = require('intel').getLogger('app');

var logger = require("./utils/logger");
var config = require("./config");

var port = process.env.PORT || 3000;

var app = express()
    .set('superSecret', config.secret)
    .use(function(req, res, next) {
        $log.info(req.method, req.url);
        next();
    })
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', function(req, res) {
        res.send('Hello! The API is at http://localhost:' + port + '/api');
    })
    .use('/', (new (require('./api/api'))).router)
    .listen(port);

$log.info('Magic happens at http://localhost:' + port);