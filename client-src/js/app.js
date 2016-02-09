var angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('angular-messages');
require('angular-mocks');
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
<md-button ui-sref="app.login" ng-hide="$root.checkScope('auth')">login</md-button>
<md-button ui-sref="app.admin" ng-show="$root.checkScope('admin')">admin</md-button>
<md-button ui-sref="app.rlconfig">Config</md-button>
<md-button ng-click="appCtrl.logout()" ng-show="$root.checkScope('auth')">logout</md-button>
<!--<md-button ng-click="$root.waSpinner = !$root.waSpinner">{{$root.checkScope('auth')}}</md-button>-->
`
        }
      }
    });
}]);

app.config(['DSProvider', 'DSHttpAdapterProvider', function (DSProvider, DSHttpAdapterProvider) {
  DSProvider.defaults.basePath = '/api';
}]);

app.run(['DS', function (DS) {
  require('loader.model')(DS);
}]);

app.run(['$rootScope', '$log', '$state', 'Principal', function ($rootScope, $log, $state, Principal) {
  $rootScope.APP_NAME = APP_NAME;
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeStart', toState.name, '>', fromState.name);
    if (toState.scopes) {
      if (!Principal.checkScope(toState.scopes[0])) {
        event.preventDefault();
        $state.go('app.home');
      }
    }
  });
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeSuccess', toState.name, '>', fromState.name);
    $rootScope.state = toState;
    $rootScope.state.displayName = toState.name.replace(/^app/, APP_NAME).replace(/\./g, '/');
  });
  $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
  });
}]);

require('./ctrl.app')(app);
require('./common/config.common.js')(app);
require('./states/config.states.js')(app);
