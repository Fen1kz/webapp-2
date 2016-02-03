module.exports = (app) => {
  app
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push(factory);
    }])
};

factory.$inject = ['$q', '$injector'];
function factory($q, $injector) {
  return {
    requestError: function (request) {
      return $q.reject(request);
    },
    responseError: function (response) {
      var $mdToast = $injector.get("$mdToast");
      $mdToast.show(
        $mdToast.simple()
          .content(response.data)
          .position('bottom right')
          .hideDelay(30000)
      );
      return $q.reject(response);
    }
  };
}
