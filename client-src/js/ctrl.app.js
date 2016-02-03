module.exports = (app) => {
  app.controller('AppCtrl', controller);
};

controller.$inject = ['$rootScope', '$mdToast'];
function controller($rootScope, $mdToast) {
  var ctrl = this;
  $rootScope.$on('wa-spinner', (event, flag) => {
    ctrl.waSpinner = flag;
  });

  $mdToast.show(
    $mdToast.simple()
      .textContent('asd asdf asdf asdf!')
      .position('top')
      .hideDelay(30000)
  );
}
