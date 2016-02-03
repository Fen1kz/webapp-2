module.exports = (app) => {
  require('./wa-spinner/wa-spinner')(app);
  require('./wa-spinner/interceptor.wa-spinner')(app);
  require('./interceptor.toast')(app);

  app.factory('Principal', require('./service.principal.js'));
};
