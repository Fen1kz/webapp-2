module.exports = (app) => {
  app.controller('AppCtrl', controller);
};

controller.$inject = ['$rootScope', '$state', 'Principal'];
function controller($rootScope, $state, Principal) {
  var ctrl = this;
  $rootScope.$on('wa-spinner', (event, flag) => {
    $rootScope.waSpinner = flag;
  });

  $rootScope.$watch(() => Principal.user, (val) => {
    ctrl.user = val;
  });

  $rootScope.checkScope = Principal.checkScope;

  ctrl.logout = () => Principal.logout()
    .then(() => {
      $state.go('app.home');
    });

  $rootScope.stateGo = ($event, name, params) => {
    $event.preventDefault();
    $event.stopPropagation();
    $state.go(name, params);
  };
}
