var angular = require('angular');

module.exports = directive;

directive.$inject = ['$compile'];

function directive($compile) {
  return {
    restrict: 'E'
    , scope: {
      item: '='
    }
    , replace: true
    , template: `
<li class='cclass'>
  <a class='link gates' ng-class='{active: $root.stateParams.cclass._id === item._id}' ng-mouseenter='emit("mouseenter", item)' ng-mouseleave='emit("mouseleave", item)' ng-click='emit("select", item)'>{{item.name}}</a>
</li>`
    , link: function (scope, element, attrs) {
      scope.$watch('item.children.length', (length, old) => {
        //if (length !== void 0) {
        //  console.log(scope.item.name, length, old, length > 0 && !old);
        //}
        if (length === 0 && old > 0) {
          element.find('ul').remove();
        }
        if (length > 0 && (length === old || !old)) {
          var childElement = $compile(angular.element(`<ul><rl-char-class-tree ng-repeat='child in item.children' item='child'></rl-char-class-tree></ul>`))(scope);
          element.append(childElement);
        }
      });
    }
    , controller: ['$scope', function ($scope) {
      //$scope.$on('$destroy', () => {
      //  console.log('destroyed', $scope.item.name);
      //});
      $scope.emit = (event, item) => $scope.$emit(event, item);
    }]
  }
}