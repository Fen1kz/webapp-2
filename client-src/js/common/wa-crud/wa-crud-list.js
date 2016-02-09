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
    , controller: ['$scope', '$mdDialog', 'DS', function ($scope, $mdDialog, DS) {
      var ctrl = this;
      var Resource = DS.definitions[ctrl.model];
      Resource.findAll();
      Resource.bindAll({}, $scope, 'items');


      $scope.delete = ($event, item) => {
        $event.preventDefault();
        $event.stopPropagation();
        $mdDialog.show($mdDialog.confirm()
          .title('Delete ' + ctrl.model + '#' + item._id + '?')
          .targetEvent($event)
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ok('delete')
          .cancel('cancel'))
          .then(() => item.DSDestroy());
      }
    }]
  }
}

