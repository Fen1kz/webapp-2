module.exports = controller;

controller.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'DS'];

function controller($scope, $state, $stateParams, $timeout, DS) {
  var ctrl = this;
  var Resource = DS.definitions.CharClass;
  Resource.findAll({
    orderBy: ['_id', 'ASC']
  });
  $scope.$watch(() => Resource.lastModified()
    , () => {
      ctrl.items = Resource.filter({
        where: {
          parent_id: {
            '===': void 0
          }
        }
      }).reverse();
    });

  $scope.$on('select', (_, item) => {
    //if (ctrl.itemSelected) ctrl.itemSelected.DSRevert();
    if (ctrl.itemSelected === item) {
      ctrl.itemSelected = null;
      $stateParams.cclass = null;
    } else {
      ctrl.itemSelected = item;
      $stateParams.cclass = item;
    }
    ctrl.itemForm = item;
  });

  $timeout(() => {
    $scope.$emit('select', Resource.filter({name: 'Fighter'})[0]);
  }, 800);

  $scope.$on('mouseenter', (_, item) => {
    //if (ctrl.itemForm) ctrl.itemForm.DSRevert();
    ctrl.itemForm = item;
  });

  $scope.$on('mouseleave', (_, item) => {
    //if (item) item.DSRevert();
    ctrl.itemForm = ctrl.itemSelected || null;
  });
}
