const User = require('../db/models/User');
const db = require('../db/db');

xtest('DB returns an object', () => {
  User.findAll({}).then(data => expect(typeof data).toBe('object'));
});

xtest('postgreSQL is populated with users', () => {
  User.findAll({}).then(data => expect(data).toBeTruthy());
});

xtest('DB should return Jason', () => {
  User.findOne({
    where: {
      id: 1,
    },
  }).then(data => expect(data.name).toBe('Jason Lusthaus'));
});

afterAll(() => {
  db.close();
})
