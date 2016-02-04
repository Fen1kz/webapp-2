module.exports = factory;

factory.$inject = ['APP_NAME', '$http', '$q', 'Storage'];
function factory(APP_NAME, $http, $q, Storage) {
  const USER_KEY = APP_NAME + '_user';
  const TOKEN_KEY = APP_NAME + '_token';

  //var userStr = Storage.get(USER_KEY);
  //var tokenStr = Storage.get(TOKEN_KEY);
  //var Promise = $q((resolve, reject) => {
  //  if (userStr === null) {
  //    if (tokenStr === null) {
  //    } else {
  //      $http.get('/auth')
  //        .then((response) => {
  //          console.log('response', response);
  //        })
  //    }
  //  }
  //});

  var $this = {
    init: () => {
      //return Promise;
    }
    , USER_KEY: USER_KEY
    , TOKEN_KEY: TOKEN_KEY
    , login: (formData) => {
      return $http.post('/auth/login', formData)
        .then((response) => {
          if (typeof response.data !== 'object') throw 'wrong response';
          Storage.set(USER_KEY, response.data);
        });
    }
    , logout: () => {
      Storage.remove(USER_KEY);
      $this.$user = null;
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
