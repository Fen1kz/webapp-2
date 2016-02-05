var Promise = require('bluebird');

module.exports = class DefaultRESTCtrl extends require('./default.ctrl') {
  init(model) {
    this.model = model;
    this.baseUrl = '/' + this.model.endpoint;
  }

  start() {
    this.serve('get', '/', this.findAll);
    this.serve('get', '/:id', this.find);
    this.serve('post', '/', this.create);
    this.serve('put', '/:id', this.update);
    this.serve('delete', '/:id', this.delete);
  }

  findAll() {
    return this.model.findAll();
  }

  find(req) {
    return this.model.find(req.params.id);
  }

  create(req) {
    return this.model.create(req.body);
  }

  update(req) {
    return this.model.update(req.params.id, req.body);
  }

  delete(req) {
    return this.model.destroy(req.body.id);
  }
};
