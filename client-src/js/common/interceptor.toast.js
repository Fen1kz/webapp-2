module.exports = (app) => {
  app
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push(factory);
    }])
};

factory.$inject = ['$q', '$injector'];
function factory($q, $injector) {
  var $mdToast;

  var get$mdToast = () => {
    if (!$mdToast) {
      $mdToast = $injector.get("$mdToast");
    }
    return $mdToast;
  };

  return {
    requestError: function (request) {
      return $q.reject(request);
    },
    responseError: function (response) {
      get$mdToast().show(
        get$mdToast().simple()
          .textContent('Simple Toast!')
          .position('top left')
          .hideDelay(30000)
      );
      return $q.reject(response);
    }
  };
}
