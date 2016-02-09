module.exports = (app) => {
  app.config(['$stateProvider', 'waCrudProvider', ($stateProvider, waCrudProvider) => {
    $stateProvider.state('app.rlconfig.char-class', {
      url: '/char-class'
      , views: {
        'main@': {
          template: require('./tmpl.char-class.html')
        }
      }
      , scopes: ['admin']
    });
  }]);
};
