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

  $scope.$on('rlCharClassTree.selected', (_, item) => {
    console.log('rlCharClassTree.selected');
    //if (ctrl.itemSelected) ctrl.itemSelected.DSRevert();
    if (ctrl.parentSelection) {
      $scope.$broadcast('rlCharClass.parentSelection.selected', item)
    } else {
      if (ctrl.itemSelected === item) {
        ctrl.itemSelected = null;
        $stateParams.cclass = null;
      } else {
        ctrl.itemSelected = item;
        $stateParams.cclass = item;
      }
    }
    ctrl.itemForm = item;
  });

  $timeout(() => {
    $scope.$emit('rlCharClassTree.selected', Resource.filter({name: 'Fighter'})[0]);
  }, 800);

  $scope.$on('mouseenter', ($event, item) => {
    //if (ctrl.itemForm) ctrl.itemForm.DSRevert();
    ctrl.itemForm = item;
  });

  $scope.$on('mouseleave', ($event, item) => {
    //if (item) item.DSRevert();
    ctrl.itemForm = ctrl.itemSelected || null;
  });

  $scope.$on('rlCharClassEdit.parentSelection.open-close', ($event, state) => {
    ctrl.parentSelection = state;
    console.log('rlCharClassEdit.parentSelection.open-close', state);
  });
}
