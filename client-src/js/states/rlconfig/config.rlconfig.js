module.exports = (app) => {
  app.config(['$stateProvider', 'waCrudProvider', ($stateProvider, waCrudProvider) => {
    $stateProvider.state('app.rlconfig', {
      url: '/rlconfig'
      , views: {
        'main@': {
          template: require('./tmpl.rlconfig.html')
        }
      }
      , scopes: ['admin']
    });
  }]);
};
