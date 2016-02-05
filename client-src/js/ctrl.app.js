module.exports = (app) => {
  app.controller('AppCtrl', controller);
};

controller.$inject = ['$rootScope', '$state', 'Principal'];
function controller($rootScope, $state, Principal) {
  var ctrl = this;
  $rootScope.$on('wa-spinner', (event, flag) => {
    ctrl.waSpinner = flag;
  });

  $rootScope.$watch(() => Principal.user, (val) => {
    ctrl.user = val;
  });

  ctrl.checkScope = Principal.checkScope;
  ctrl.logout = Principal.logout;

  $rootScope.stateGo = ($event, name, params) => {
    $event.preventDefault();
    $event.stopPropagation();
    $state.go(name, params);
  }
}
