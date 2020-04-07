'use strict';
const { questions } = require('../models/index');

async function createQuestion(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }
  let { payload, state } = req;
  let result;
  try {
    result = await questions.create(payload, state.user);
    console.log(`Pregunta creada con el id: ${result}`);
  } catch (error) {
    console.error(error);
    return h
      .view('ask', {
        title: 'Crear pregunta',
        error: 'Problemas creando la pregunta',
      })
      .code(500)
      .takeover();
  }
  return h.response(`Pregunta creada con el id: ${result}`).code(201);
}

module.exports = {
  createQuestion,
};
