module.exports = (app) => {
  app.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app.admin', {
      url: '/admin'
      , views: {
        'main@': {
          template: require('./tmpl.admin.html')
        }
      }
      , scopes: ['admin']
    });
  }]);

  //app.controller('homeCtrl', ['$scope', 'DS', function ($scope, DS) {
  //    DS.definitions.CharClass.findAll();
  //    $scope.$watch(() => DS.lastModified('CharClass')
  //        , () => $scope.data = DS.filter('CharClass'));
  //}]);
};
