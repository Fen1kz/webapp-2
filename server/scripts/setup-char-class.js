var Promise = require('bluebird');
var models = require('../db/model');
var CharClass = models.CharClass;

var ccdata = [
  {name: 'Adventurer'},
  {name: 'Fighter', parent_id: 'Adventurer'},
  {name: 'Knight', parent_id: 'Fighter'},
  {name: 'Baron', parent_id: 'Knight'},
  {name: 'Lord', parent_id: 'Baron'},
  {name: 'Crusader', parent_id: 'Knight'},
  {name: 'Inquisitor', parent_id: 'Crusader'},
  {name: 'Paladin', parent_id: 'Crusader'},
  {name: 'Death Knight', parent_id: 'Knight'},
  {name: 'Death Lord', parent_id: 'Death Knight'},
  {name: 'Warrior', parent_id: 'Fighter'},
  {name: 'Barbarian', parent_id: 'Warrior'},
  {name: 'Berserker', parent_id: 'Barbarian'},
  {name: 'Warlord', parent_id: 'Warrior'},
  {name: 'Chieftain', parent_id: 'Warlord'},
  {name: 'Bandit', parent_id: 'Adventurer'},
  {name: 'Rogue', parent_id: 'Bandit'},
  {name: 'Ninja', parent_id: 'Rogue'},
  {name: 'Shadow', parent_id: 'Ninja'},
  {name: 'Killer', parent_id: 'Rogue'},
  {name: 'Assassin', parent_id: 'Killer'},
  {name: 'Ranger', parent_id: 'Bandit'},
  {name: 'Hunter', parent_id: 'Ranger'},
  {name: 'Predator', parent_id: 'Hunter'},
  {name: 'Druid', parent_id: 'Hunter'},
  {name: 'Marksman', parent_id: 'Ranger'},
  {name: 'Sniper', parent_id: 'Marksman'},
  {name: 'Artillerist', parent_id: 'Marksman'},
  {name: 'Wizard', parent_id: 'Adventurer'},
  {name: 'Sorcerer', parent_id: 'Wizard'},
  {name: 'Mage', parent_id: 'Sorcerer'},
  {name: 'Archmage', parent_id: 'Mage'},
  {name: 'Necromancer', parent_id: 'Sorcerer'},
  {name: 'Lich', parent_id: 'Necromancer'},
  {name: 'Witch', parent_id: 'Sorcerer'},
  {name: 'Warlock', parent_id: 'Witch'},
  {name: 'Acolyte', parent_id: 'Wizard'},
  {name: 'Monk', parent_id: 'Acolyte'},
  {name: 'Fanatic', parent_id: 'Monk'},
  {name: 'Exalted', parent_id: 'Monk'},
  {name: 'Priest', parent_id: 'Acolyte'},
  {name: 'Bishop', parent_id: 'Priest'}
];

CharClass.destroyAll()
  .then(() => Promise.all(ccdata.map((ccls) => CharClass.create(ccls))))
  .then(() => CharClass.findAll())
  .then((data) => {
    return Promise.all(data.map((cclass, i, array) => {
      var parent = array.find((ccls) => ccls.name === cclass.parent_id);
      if (parent) {
        delete cclass.parent_id;
        return CharClass.update(cclass._id, {
          parent_id: parent._id
        });
      } else {
        return Promise.resolve(null);
      }
    }));
  })
  .then(() => {
    CharClass.findAll({name: 'Adventurer'}).then(console.log);
  })
  .then(() => console.log('DONE: setup-char-class'))
  .catch((err) => {
    console.error(err);
  });
