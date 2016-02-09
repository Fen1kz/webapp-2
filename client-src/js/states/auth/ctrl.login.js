module.exports = LoginCtrl;

LoginCtrl.$inject = ['$state', '$stateParams', 'Principal'];
function LoginCtrl($state, $stateParams, Principal) {
  if (Principal.user) {
    this.item = {
      login: Principal.user.login
    }
  }
  this.submitForm = () => Principal.login(this.item)
    .then(() => {
      if ($stateParams.nextState) {
        $state.go($stateParams.nextState.name, $stateParams.params);
      } else {
        $state.go('app.home');
      }
    });
}
