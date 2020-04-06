'use strict';
const { users } = require('../models/index');
const Boom = require('@hapi/boom');

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

async function validateUser(req, h) {
  let result;
  try {
    result = await users.validateUser(req.payload);
    if (!result) {
      return h.response('Datos incorrectos').code(400);
    }
  } catch (error) {
    console.error(error);
    return h.response(`Problemas validando el usuario`).code(500);
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email,
  });
}

function logout(req, h) {
  return h.redirect('/login').unstate('user');
}

function failValidation(req, h, err) {
  return Boom.badRequest('Falló la validación', req.payload);
}

module.exports = {
  createUser,
  validateUser,
  logout,
  failValidation,
};
