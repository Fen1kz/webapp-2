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

      $scope.$watch('item', (value) => {
        if (value) {

        }
      });

      ctrl.$disabled = [];

      $scope.parentSelectClicked = ($event) => {
        //$event;
        debugger;
      };

      //$scope.$watchGroup(['item', 'item.parent_id'], function(newValues, oldValues) {
      //  if (newValues[0] && oldValues[0]) {
      //    console.log(oldValues[0].name, DS.definitions.CharClass.get(oldValues[1]).name, '>', newValues[0].name, DS.definitions.CharClass.get(newValues[1]).name)
      //  }
      //  if (newValues[0] && newValues[0].parent_id !== newValues[1]) {
      //    //if (newValues[1] && DS.definitions.CharClass.get(newValues[1]).$disabled) {
      //    //  $scope.item.parent_id = oldValues[1];
      //    //}
      //  }
      //});

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
