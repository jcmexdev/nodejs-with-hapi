const Joi = require('@hapi/joi');
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
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6),
        }),
      },
    },
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
