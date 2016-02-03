var Promise = require('bluebird');
var model = require('../db/model');
var jwt = require('jsonwebtoken');
var $log = require('intel').getLogger('app.auth');

module.exports = class LoginCtrl extends require('./default.ctrl') {
  init() {
    this.baseUrl = '/auth';

    if (!process.env.SECRET) throw 'No SECRET in .env';
  }

  start() {
    this.serve('post', '/login', this.login);
  }

  login(req) {
    return model.User.findAll({
      name: req.body.name
    }).spread((user) => {
      if (!user) throw [400, 'user not found'];
      if (user.password !== req.body.password) throw [401, 'wrong password'];

      var token = jwt.sign(user, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 //@TODO config
      });

      // return the information including token as JSON
      return token;
    });
  }

  static verify(req) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    return Promise.method(jwt.verify)(token, process.env.SECRET)
      .then((decoded) => {
        req.user = decoded;
      })
      .catch((err) => {
        if (err.message !== 'jwt must be provided') throw [403, 'no token provided'];
        if (err.message !== 'jwt malformed') throw [403, 'wrong token'];
        $log.error(err);
        throw err.name + ': ' + err.message;
      });
  }
};
