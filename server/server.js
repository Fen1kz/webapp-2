var express = require("express");
var bodyParser = require("body-parser");

var logger = require("./utils/logger");
var config = require("./config");

var port = process.env.PORT || 3000;

var app = express()
    .set('superSecret', config.secret)
    .use(require('morgan')('tiny', {stream: logger.stream}))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .get('/', function(req, res) {
        res.send('Hello! The API is at http://localhost:' + port + '/api');
    })
    .listen(port);

console.log('Magic happens at http://localhost:' + port);