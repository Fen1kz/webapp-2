var Promise = require('bluebird');

module.exports = class DefaultRESTCtrl extends require('./default.ctrl') {
    init(model) {
      this.model = model;
      this.baseUrl = '/' + this.model.endpoint;
    }

    start() {
      this.serve('get', '/', this.findAll);
      this.serve('get', '/:id', this.find);
    }

    findAll() {
        return this.model.findAll();
    }

    find(req) {
        return this.model.find(req.query.id);
    }
};
