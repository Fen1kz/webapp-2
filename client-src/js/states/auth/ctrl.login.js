module.exports = LoginCtrl;

LoginCtrl.$inject = ['Principal'];
function LoginCtrl(Principal) {
  this.submitForm = () => Principal.login(this.item);
}
