var User = require('../db/model').User;

User.create({
    name: 'admin',
    password: 'password',
    admin: true
  })
  .then(() => {
    console.log('User saved successfully');
  })
  .catch((err) => {
    console.error(err)
  });
