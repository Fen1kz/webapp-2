module.exports = (app) => {
  app.directive('rlCharClassTree', require('./rl-char-class-tree'));
  app.directive('rlCharClassEdit', require('./rl-char-class-edit'));

  app.config(['$stateProvider', 'waCrudProvider', ($stateProvider, waCrudProvider) => {
    $stateProvider
      .state('app.rlconfig.char-class', {
        url: '/char-class'
        , params: {
          cclass: null
        }
        , views: {
          'main@': {
            template: require('./tmpl.char-class.html')
            , controller: require('./ctrl.char-class')
            , controllerAs: 'ctrl'
          }
        }
        , scopes: ['admin']
      });
  }]);
};
