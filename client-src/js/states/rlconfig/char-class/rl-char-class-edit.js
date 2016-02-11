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
      DS.definitions.CharClass.bindAll({}, $scope, 'cclasses');

      //$scope.$watch('item', (value) => {
      //  if (!value || !value.parent) $scope.parentSearchText = '';
      //});
      $scope.searchClass_disabled = [];

      $scope.$watch('item', (value) => {
        if (value) {

        }
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

      $scope.filterParentClasses = () => {
        $scope.cclasses.forEach((ccls) => {
          delete ccls.$disabled;
        });
        searchChildren([$scope.item], $scope.item).forEach((ccls) => {
          ccls.$disabled = true;
        });
        return $scope.cclasses;
      };


      $scope.searchClass = (array, name) => {
        var regex = new RegExp(name, 'ig');
        return array.filter((cclass) => {
          return regex.test(cclass.name);
        });
      }
    }]
  }
}
