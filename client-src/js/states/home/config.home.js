module.exports = (app) => {
  app.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app.home', {
      url: '/'
      , views: {
        'main@': {
          template: require('./tmpl.home.html')
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
