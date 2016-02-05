module.exports = interceptor;

interceptor.$inject = ['$q', '$injector'];
function interceptor($q, $injector) {
  return {
    request: function (config) {
      var Principal = $injector.get('Principal');
      var token = Principal.user ? Principal.user.token : null;
      if (token) config.headers['x-access-token'] = token;
      return config;
    }
  };
}
