module.exports = directive;

directive.$inject = [];
function directive() {
  return {
    restrict: 'E'
    , transclude: true
    , replace: true
    , scope: {
      model: '@'
    }
    , template: require('./wa-crud-list.html')
    , bindToController: true
    , controllerAs: 'waCrudList'
    , controller: ['$scope', 'DS', function ($scope, DS) {
      var ctrl = this;
      var Resource = DS.definitions[ctrl.model];
      Resource.findAll();
      Resource.bindAll({}, $scope, 'items');
    }]
    , link: function (scope, element, attrs, ctrl, transclude) {
    }
  }
}

