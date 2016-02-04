module.exports = LoginCtrl;

LoginCtrl.$inject = ['$state', 'Principal'];
function LoginCtrl($state, Principal) {
  this.submitForm = () => Principal.login(this.item)
    .then(() => {
      $state.go('app.home');
    }) ;
}
