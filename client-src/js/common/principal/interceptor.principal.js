module.exports = interceptor;

interceptor.$inject = ['$q', '$injector'];
function interceptor($q, $injector) {
  return {
    request: function (config) {
      var Principal = $injector.get('Principal');
      var token = Principal.user ? Principal.user.token : null;
      if (token) config.headers['x-access-token'] = token;
      return config;
    },
    responseError: function (response) {
      var Principal = $injector.get('Principal');
      var $state = $injector.get('$state');
      var token = Principal.user ? Principal.user.token : null;
      if (token) {
        $state.go('app.login', {
          nextState: {
            name: $state.$current.name
            , params: $state.$current.params
          }
        }).then(() => Principal.logout());
      }
      return $q.reject(response);
    }
  };
}
