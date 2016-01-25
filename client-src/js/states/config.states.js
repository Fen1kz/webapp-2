module.exports = (app) => {
    require('./home/config.home.js')(app);

    app.config(['$stateProvider', ($stateProvider) => {
    }]);
};
