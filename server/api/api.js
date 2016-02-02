module.exports = class ApiCtrl extends require('./default.ctrl') {
    static get baseUrl() {
        return '/api';
    }

    init() {
        this.serve('get', '/', this.welcome);
    }

    welcome() {
        return 'Hello world!' + this;
    }
};