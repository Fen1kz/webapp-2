var model = require('../db/model');
var AuthCtrl = require('./auth.ctrl');

module.exports = class ApiCtrl extends require('./default.ctrl') {
  init() {
    this.baseUrl = '/api';
  }

  start() {
    this.use(this.baseUrl, AuthCtrl.verify);
    this.router.use(this.baseUrl, require('./user.rest.ctrl').createRouter(model.User));
    this.router.use(this.baseUrl, require('./default.rest.ctrl').createRouter(model.CharClass));
  }
};
