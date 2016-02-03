var angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-messages');
require('js-data');
require('js-data-angular');

const APP_NAME = 'rlike';
const app = angular.module(APP_NAME, [
  'ui.router'
  , 'ngMessages'
  , 'ngMaterial'
  , 'js-data'
]);

app.constant('APP_NAME', APP_NAME);

app.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('app', {
      url: ''
      , abstract: true
      , views: {
        'toolbar@': {
          template: `
<md-button ui-sref="app.home">{{::APP_NAME}}</md-button>
<md-button ui-sref="app.login">login</md-button>
<md-button ui-sref="app.logout">logout</md-button>
<md-button ui-sref="app.admin">admin</md-button>
`
        }
      }
    });
}]);

app.config(['DSProvider', 'DSHttpAdapterProvider', function (DSProvider, DSHttpAdapterProvider) {
  DSProvider.defaults.basePath = '/api';
}]);

app.run(['$rootScope', '$log', function ($rootScope, $log) {
  $rootScope.APP_NAME = APP_NAME;
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeStart', toState.name, '>', fromState.name);
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeSuccess', toState.name, '>', fromState.name);
    $rootScope.state = toState;
    $rootScope.state.displayName = toState.name.replace(/^app/, APP_NAME).replace('.', '/');
  });
  $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
  });
}]);

app.run(['DS', function (DS) {
  //DS.defineResource(require('model/char-class'))
}]);

require('./common/config.common.js')(app);
require('./states/config.states.js')(app);
