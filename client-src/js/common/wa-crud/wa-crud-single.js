module.exports = directive;

var templates = {
  create: require('./wa-crud-single-create.html')
  , edit: require('./wa-crud-single-edit.html')
  , view: require('./wa-crud-single-view.html')
};

directive.$inject = [];
function directive() {
  return {
    restrict: 'E'
    , transclude: true
    , replace: true
    , scope: {
      model: '@'
      , action: '@'
    }
    , template: (element, attrs) => templates[attrs.action]
    , bindToController: true
    , controllerAs: 'waCrud'
    , controller: ['$scope', '$state', '$stateParams', 'DS', function ($scope, $state, $stateParams, DS) {
      var ctrl = this;

      var Resource = DS.definitions[ctrl.model];

      if (ctrl.action === 'create') {
        $scope.item = Resource.createInstance();
      } else {
        Resource.find($stateParams.id)
          .then((item) => {
            if (!Resource.is(item)) $state.go('^');
            $scope.item = item;
          })
          .catch(() => $state.go('^'));
      }

      ctrl.create = () => {
        return Resource.create($scope.item)
          .then(() => {
            $state.go('^');
          });
      };
      ctrl.edit = () => {
        return Resource.update($scope.item._id, $scope.item)
          .then(() => {
            $state.go('^');
          });
      };
    }]
    , link: function (scope, element, attrs, ctrl, transclude) {
    }
  }
}

