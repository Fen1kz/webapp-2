var angular = require('angular');
require('angular-ui-router');
require('js-data');
require('js-data-angular');

const APP_NAME = 'rlike';
const app = angular.module(APP_NAME, [
  'ui.router'
  , 'ng-material'
  , 'js-data'
]);

app.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      url: '',
      abstract: true
    })
}]);

app.config(['DSProvider', 'DSHttpAdapterProvider', function (DSProvider, DSHttpAdapterProvider) {
  DSProvider.defaults.basePath = '/api';
}]);

app.run(['DS', function (DS) {
  //DS.defineResource(require('model/char-class'))
}]);

require('./states/config.states.js')(app);
