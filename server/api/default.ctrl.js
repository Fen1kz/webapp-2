var Promise = require('bluebird');
var express = require('express');

module.exports = class DefaultCtrl {
  constructor(...args) {
    this.router = express.Router();
    this.init(...args);
    this.start();
  }

  static createRouter(...args) {
    return new this(...args).router;
  }

  init() {
  }

  start() {
  }

  serve(method, url, fn) {
    this.router[method](this.baseUrl + url, (req, res, next) => {
      Promise.method(fn.bind(this))(req, res, next)
        .bind(this)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        })
    });
  }

  use(url, fn) {
    this.router.use(url, (req, res, next) => {
      Promise.method(fn.bind(this))(req, res, next)
        .bind(this)
        .then((data) => {
          next()
        })
        .catch((err) => {
          next(err);
        })
    });
  }
};
