'use strict';
const { users } = require('../models/index');

async function createUser(req, h) {
  let result;
  try {
    result = await users.create(req.payload);
  } catch (error) {
    console.error(error);
    return h.response(`Problemas creando el usuario`).code(500);
  }

  return h.response(`Usuario creado ID: ${result}`).code(201);
}

module.exports = {
  createUser,
};
