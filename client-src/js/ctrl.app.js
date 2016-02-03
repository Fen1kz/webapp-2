module.exports = (app) => {
  app.controller('AppCtrl', controller);
};

controller.$inject = ['$rootScope'];
function controller($rootScope) {
  var ctrl = this;
  $rootScope.$on('wa-spinner', (event, flag) => {
    ctrl.waSpinner = flag;
  });
}
