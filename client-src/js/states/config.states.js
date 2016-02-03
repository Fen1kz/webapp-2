module.exports = (app) => {
    //require('./home/config.home.js')(app);
    require('./admin/config.admin.js')(app);

    app.config(['$stateProvider', ($stateProvider) => {
    }]);
};
