module.exports = (app) => {
  app.directive('waSpinner', waSpinner);
};

function waSpinner() {
  return {
    restrict: 'E'
    , scope: {
      ngShow: '='
    }
    , template: require('./wa-spinner.html')
    , link: (scope, element, attrs) => {
      element[0].style['z-index'] = 3;
      element.parent().addClass('wa-spinner-host');
      scope.$watch('ngShow', (val) => {
        element.parent()[val ? 'addClass' : 'removeClass']('wa-spinner-host-on');
        element.parent()[!val ? 'addClass' : 'removeClass']('wa-spinner-host-off');
      });
    }
  };
}
