var _ = require('lodash');
var md5 = require('md5');

module.exports = class UserCtrl extends require('./default.rest.ctrl') {
  findAll(...args) {
    return super.findAll(...args)
      .then((users) => users.map((user) => _.omit(user, ['password'])));
  }

  find(...args) {
    return super.find(...args)
      .then((user) => _.omit(user, ['password']))
  }

  create(req) {
    var user = req.body;
    user.password = md5(user.password);
    user.scopes = _.reduce(user.scopes, (result, value, scope) => {
      if (value) result.push(scope);
      return result;
    }, ['auth']);
    return this.model.create(user);
  }
};
