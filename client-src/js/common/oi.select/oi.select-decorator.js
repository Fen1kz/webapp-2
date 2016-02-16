module.exports = (app) => {
  app.decorator("oiSelectDirective", ['$delegate', function ($delegate) {
    var directive = $delegate[0];
    var $compile = directive.compile;
    directive.compile = (tElement, tAttrs) => {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          if (iAttrs.emitOpenClose) {
            scope.$watch('isOpen', function (isOpen) {
              scope.$emit(iAttrs.emitOpenClose, isOpen);
            });
          }
        },
        post: $compile(tElement, tAttrs)
      }
    };

    return $delegate;
  }]);
};
