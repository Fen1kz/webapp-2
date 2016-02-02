var Promise = require('bluebird');
var express = require('express');

module.exports = class DefaultCtrl {
    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
    }

    serve(method, url, fn) {
        this.router[method](this.constructor.baseUrl + url, (req, res, next) => {
            return Promise.method(fn.bind(this))(req, res, next)
                .bind(this)
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    next(err);
                })
        });
    }
};