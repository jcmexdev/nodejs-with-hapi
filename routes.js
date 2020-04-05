const { register, home } = require('./controllers/site');
const { createUser } = require('./controllers/user');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: home,
  },
  {
    method: 'GET',
    path: '/register',
    handler: register,
  },
  {
    method: 'POST',
    path: '/create-user',
    handler: createUser,
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index'],
      },
    },
  },
];
