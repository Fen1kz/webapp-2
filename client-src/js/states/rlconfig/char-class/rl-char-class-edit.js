module.exports = directive;

directive.$inject = ['$compile'];

function directive($compile) {
  return {
    restrict: 'E'
    , scope: {
      item: '='
    }
    , template: require('./rl-char-class-edit.html')
    , controller: ['$scope', 'DS', function ($scope, DS) {
      var ctrl = this;
      DS.definitions.CharClass.bindAll({}, $scope, 'cclasses');

      //$scope.$watch('item', (value) => {
      //  if (!value || !value.parent) $scope.parentSearchText = '';
      //});
      $scope.searchClass_disabled = [];

      var oldItem;
      $scope.$watchGroup(['item', 'item.parent_id'], (newValues, oldValues) => {
        let newItem = newValues[0];
        let newParentId = newValues[1];
        let oldParentId = oldValues[1];
        //console.log('item',(oldItem ? oldItem.name : null), '>', (newItem ? newItem.name : null));
        //console.log('item.parent_id',(oldParentId ? DS.definitions.CharClass.get(oldParentId).name : null), '>', (newParentId ? DS.definitions.CharClass.get(newParentId).name : null))
        if (newItem && newItem === oldItem) {
          if (newParentId && DS.definitions.CharClass.get(newParentId).$disabled) {
            newItem.parent_id = oldParentId;
          }
        }
        oldItem = newValues[0];
      });

      $scope.$on('rlCharClass.parentSelection.selected', (_, item) => {
        $scope.item.parent_id = item._id;
      });

      var searchChildren = (result, item) => {
        return item.children.reduce((result, child) => {
          var cc = child.children;
          if (cc && cc.length > 0) {
            var sc = searchChildren(result, child);
            result.concat(sc);
          }
          result.push(child);
          return result;
        }, result);
      };

      ctrl.$disabled = [];
      $scope.filterParentClasses = () => {
        $scope.cclasses.forEach((ccls) => {
          delete ccls.$disabled;
        });
        ctrl.$disabled = searchChildren([$scope.item], $scope.item);
        ctrl.$disabled.forEach((ccls) => {
          ccls.$disabled = true;
        });
        return $scope.cclasses;
      };
    }]
  }
}
