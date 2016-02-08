module.exports = function directive() {
  return {
    restrict: 'EA'
    , replace: true
    , scope: {}
    , template: `
<div class='wa-breadcrumbs' md-whiteframe='1'>
  <span ng-repeat='state in states'> / <a class='link' ui-sref='{{state.name}}'>{{state.name}}</a></span>
</div>
`
    , controller: ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
      $scope.states = [];
      $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $scope.states = [];
        for (var state = toState; state.name !== '';) {
          $scope.states.push(state);
          state = $state.get('^', state);
        }
        $scope.states.reverse();
      });
    }]
  };
};
