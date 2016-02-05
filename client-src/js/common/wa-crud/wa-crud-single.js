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
      //$scope.waCrud = this;
      var ctrl = this;
      var Resource = DS.definitions[ctrl.model];


      switch (ctrl.action) {
        case 'create':
          ctrl.item = Resource.createInstance();
          break;
        case 'edit':
        case 'view':
          Resource.find($stateParams.id)
            .then((item) => {
              if (!item) $state.go('^');
              ctrl.item = item;
            })
            .catch(() => $state.go('^'));
          break;
      }

      ctrl.create = () => {
        return Resource.create(ctrl.item)
          .then(() => {
            $state.go('^');
          });
      };
      ctrl.edit = () => {
        return Resource.update(ctrl.item)
          .then(() => {
            $state.go('^');
          });
      };
    }]
    , link: function (scope, element, attrs, ctrl, transclude) {
    }
  }
}

