module.exports = (DS) => {
  DS.defineResource(require('./model/user'));
  DS.defineResource(require('./model/gamedata/char-class'));
};
