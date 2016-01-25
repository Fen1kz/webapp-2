require("babel-register");

var _ = require('lodash');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var JSData = require('js-data');
var DSMongoDBAdapter = require('js-data-mongodb');

var store = new JSData.DS();
var adapter = new DSMongoDBAdapter(process.env.DB_MONGO_URL);
store.registerAdapter('mongodb', adapter, {default: true});

var app = express();

let routerAPI = express.Router();

routerAPI.get('/', (req, res) => {
    res.status(200).json({msg: 'OK'});
});

let DefaultRESTController = require('./controllers/default');
['CharClass'].forEach((modelName) => {
    let model = store.defineResource(require('../shared/model/' + _.kebabCase(modelName)));
    let controller = new DefaultRESTController(model);
    let router = controller.route(express.Router());
    routerAPI.use('/' + model.name, router);
});

app
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({extended: true})) // support encoded bodies
    .use(express.static(__dirname + '/../dist'))
    .use('/api', routerAPI)
    .use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send('ERROR: Something broke!');
    })

    .listen(process.env.PORT || 5000);