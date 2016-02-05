module.exports = (app) => {
  app.config(['$stateProvider', 'waCrudProvider', ($stateProvider, waCrudProvider) => {
    $stateProvider.state('app.admin', {
      url: '/admin'
      , views: {
        'main@': {
          template: require('./tmpl.admin.html')
        }
      }
      , scopes: ['admin']
    });
    waCrudProvider.states({
      name: 'app.admin'
      , model: 'User'
      , endpoint: 'users'
      , view: 'main@'
      , templates: {
        list: require('./users/crud.users.list.html'),
        create: require('./users/crud.users.create-edit.html'),
        edit: require('./users/crud.users.create-edit.html'),
        view: require('./users/crud.users.list.html')
      }
      , state: {
        scopes: ['admin']
      }
    });
  }]);

  //app.controller('homeCtrl', ['$scope', 'DS', function ($scope, DS) {
  //    DS.definitions.CharClass.findAll();
  //    $scope.$watch(() => DS.lastModified('CharClass')
  //        , () => $scope.data = DS.filter('CharClass'));
  //}]);
};
