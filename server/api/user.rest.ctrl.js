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
    return this.model.create(user);
  }

  update(req) {
    var user = _.omit(req.body, '_id');
    if (user.password != void 0) user.password = md5(user.password);
    console.log('GOING TO SAVE');
    console.log(user);
    console.log('=====');
    return this.model.update(req.params.id, user);
  }
};
