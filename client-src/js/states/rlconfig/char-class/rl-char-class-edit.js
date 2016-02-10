var angular = require('angular');

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

      $scope.$watch('item', (value) => {
        if (!value || !value.parent) $scope.parentSearchText = '';
      });

      $scope.searchClass = (array, name) => {
        var regex = new RegExp(name, 'ig');
        return array.filter((cclass) => {
          return regex.test(cclass.name);
        });
      }
    }]
  }
}
