var Promise = require('bluebird');

module.exports = class DefaultRESTCtrl extends require('./default.ctrl') {
    constructor(model) {
        super();
        this.model = model;
    }

    route(router) {
        return router
            .get('/', this.serve(this.findAll).bind(this))
            .get('/:id', this.serve(this.find).bind(this))
            //.get('/:id', this.serve(this.find).bind(this))
            ;
    }

    findAll() {
        return this.model.findAll();
    }

    find(req) {
        return this.model.find(req.query.id);
    }
};