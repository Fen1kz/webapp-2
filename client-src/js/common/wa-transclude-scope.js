module.exports = function directive() {
  return {
    restrict: 'EAC',
    link: function (scope, element, attrs, controller, transclude) {
      transclude(scope, function(clone) {
        element.empty();
        element.append(clone);
      });
    }
  };
};
