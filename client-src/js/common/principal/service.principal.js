module.exports = factory;

factory.$inject = ['APP_NAME', '$http', '$q', 'Storage'];
function factory(APP_NAME, $http, $q, Storage) {
  const USER_KEY = APP_NAME + '_user';
  var $this = {
    USER_KEY: USER_KEY
    , login: (formData) => {
      return $http.post('/auth/login', formData)
        .then((response) => {
          if (typeof response.data !== 'object') throw 'wrong response';
          var user = response.data;
          user.scopes.push('auth');
          Storage.set(USER_KEY, user);
        });
    }
    , logout: () => {
      Storage.remove(USER_KEY);
      $this.$user = null;
      return $q.when(true);
    }
    , get user() {
      if (!$this.$user) $this.$user = Storage.get(USER_KEY);
      return $this.$user;
    }
    , checkScope: (scope) => {
      if (!$this.user || !$this.user.scopes) return false;
      return $this.user.scopes.some(($scope) => $scope === scope);
    }
  };

  return $this;
}
