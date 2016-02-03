module.exports = (app) => {
  app
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push(factory);
    }])
};

factory.$inject = ['$q', '$rootScope'];
function factory($q, $rootScope) {
  var numLoadings = 0;
  return {
    request: function (config) {
      numLoadings++;
      $rootScope.$broadcast('wa-spinner', true);
      return config || $q.when(config)
    },
    response: function (response) {
      if ((--numLoadings) === 0) {
        $rootScope.$broadcast('wa-spinner', false);
      }
      return response || $q.when(response);
    },
    responseError: function (response) {
      if (!(--numLoadings)) {
        $rootScope.$broadcast('wa-spinner', false);
      }
      return $q.reject(response);
    }
  };
}
