module.exports = (app) => {
  app.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app.login', {
      url: '/login'
      , params: {
        nextState: null
      }
      , views: {
        'main@': {
          template: require('./tmpl.login.html')
          , controller: require('./ctrl.login')
          , controllerAs: 'ctrl'
        }
      }
    });
  }]);

  //app.controller('homeCtrl', ['$scope', 'DS', function ($scope, DS) {
  //    DS.definitions.CharClass.findAll();
  //    $scope.$watch(() => DS.lastModified('CharClass')
  //        , () => $scope.data = DS.filter('CharClass'));
  //}]);
};
