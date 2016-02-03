var path = require('path');
var glob = require('glob');

var store = require('./store');

var models = glob
  .sync('./shared/model/**/*.js')
  .map((file) => require(path.resolve(file)))
  .reduce((result, model) => {
    result[model.name] = store.defineResource(model);
    return result;
  }, {});

module.exports = models;
