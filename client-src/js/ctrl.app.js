module.exports = (app) => {
  app.controller('AppCtrl', controller);
};

controller.$inject = ['$rootScope', 'Principal'];
function controller($rootScope, Principal) {
  var ctrl = this;
  $rootScope.$on('wa-spinner', (event, flag) => {
    ctrl.waSpinner = flag;
  });

  $rootScope.$watch(() => Principal.user, (val) => {
    ctrl.user = val;
  });

  ctrl.checkScope = Principal.checkScope;
  ctrl.logout = Principal.logout;
}
