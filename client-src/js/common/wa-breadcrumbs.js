var _ = require('lodash');

module.exports = function directive() {
  return {
    restrict: 'EA'
    , replace: true
    , scope: {}
    , template: `
<div class='wa-breadcrumbs' md-whiteframe='1'>
  <span ng-repeat='state in states'> / <a class='opens' ui-sref='{{state.name}}'>{{state.formattedName}}</a></span>
</div>
`
    , controller: ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
      $scope.states = [];
      $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $scope.states = [];
        for (var state = toState; state.name !== '';) {
          $scope.states.push(state);
          state.formattedName = _.chain(state.name).split('.').last().value();
          state = $state.get('^', state);
        }
        $scope.states.reverse();
      });
    }]
  };
};
