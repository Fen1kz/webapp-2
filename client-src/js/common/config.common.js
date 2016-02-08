module.exports = (app) => {
  require('./wa-spinner/wa-spinner')(app);
  require('./wa-spinner/interceptor.wa-spinner')(app);

  app.config(['$httpProvider', ($httpProvider) => $httpProvider.interceptors.push(require('./interceptor.toast'))]);

  app.config(['$httpProvider', ($httpProvider) => $httpProvider.interceptors.push(require('./principal/interceptor.principal'))]);
  app.factory('Principal', require('./principal/service.principal.js'));

  app.factory('Storage', require('./service.storage'));

  app.provider('waCrud', require('./wa-crud/provider.wa-crud'));
  app.directive('waCrudList', require('./wa-crud/wa-crud-list'));
  app.directive('waCrudSingle', require('./wa-crud/wa-crud-single'));

  app.directive('waBreadcrumbs', require('./wa-breadcrumbs'));
  app.directive('waCheckbox', require('./wa-checkbox'));
  app.directive('waTranscludeScope', require('./wa-transclude-scope'));
};
