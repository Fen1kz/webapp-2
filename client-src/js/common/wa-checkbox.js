module.exports = function directive() {
  return {
    restrict: 'E'
    //, replace: true
    , transclude: true
    , scope: {
      ngModel: '='
      , value: '@'
    }
    , template: `
<md-checkbox ng-checked="arrayContains(ngModel, value)" ng-click="arrayToggle(ngModel, value);">
  <ng-transclude></ng-transclude>
</md-checkbox>
`
    , link: function (scope, element, attrs, controller) {
      if (!Array.isArray(scope.ngModel)) {
        scope.ngModel = [];
      }
      scope.arrayContains = (array, value) => Array.isArray(array) && !!~array.indexOf(value);
      scope.arrayToggle = (array, value) => {
        (scope.arrayContains(array, value)
            ? array.splice(array.indexOf(value), 1)
            : array.push(value)
        );
      }
    }
  };
};
