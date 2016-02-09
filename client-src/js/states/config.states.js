module.exports = (app) => {
  require('./admin/config.admin')(app);
  require('./auth/config.auth')(app);
  require('./home/config.home')(app);
  require('./rlconfig/config.rlconfig')(app);
  require('./rlconfig/char-class/config.char-class')(app);

  app.config(['$stateProvider', ($stateProvider) => {
  }]);
};
