module.exports = controller;

controller.$inject = ['$scope', '$state', '$stateParams', 'DS'];

function controller($scope, $state, $stateParams, DS) {
  var ctrl = this;
  var Resource = DS.definitions.CharClass;
  Resource.findAll({
    orderBy: ['_id', 'ASC']
  })
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
    $stateParams.cclass = item;
    ctrl.itemSelected = item;
    ctrl.itemForm = item;
  });

  $scope.$on('mouseenter', (_, item) => {
    //$state.go('.', {cclass: item});
    if (ctrl.itemForm && ctrl.itemForm.DSRevert) ctrl.itemForm.DSRevert();
    ctrl.itemForm = item;
  });

  $scope.$on('mouseleave', (_, item) => {
    //$state.go('.', {cclass: item});
    if (item) item.DSRevert();
    ctrl.itemForm = ctrl.itemSelected || null;
  });
}
