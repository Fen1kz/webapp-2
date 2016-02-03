module.exports = factory;

factory.$inject = ['APP_NAME', '$http', '$q', '$window'];
function factory(APP_NAME, $http, $q, $window) {
  var userStr = $window.localStorage.getItem(APP_NAME + '_user');
  var tokenStr = $window.localStorage.getItem(APP_NAME + '_token');
  var Promise = $q((resolve, reject) => {
    if (userStr === null) {
      if (tokenStr === null) {
      } else {
        $http.get('/auth')
          .then((response) => {
            console.log('response', response);
          })
      }
    }
  });
  return {
    init: () => {
      return Promise;
    }
    , login: (formData) => {
      $http.post('/auth/login', formData)
        .then((response) => {
          console.log('response', response);
        })
    }
    , checkAccess: (property) => {
      if (!this.principal) return $q.reject('Not authenticated');
      if (!this.principal[property]) return $q.reject('Not authorized');
    }
  }
}
