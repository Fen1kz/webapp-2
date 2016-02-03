module.exports = (app) => {
  require('./admin/config.admin')(app);
  require('./auth/config.auth')(app);
  require('./home/config.home')(app);

  app.config(['$stateProvider', ($stateProvider) => {
  }]);
};
