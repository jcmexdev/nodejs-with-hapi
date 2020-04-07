'use strict';
const { answers } = require('../models/index');

async function answerQuestion(req, h) {
  let result;
  try {
    result = await answers.answer(req.payload, req.state.user);
    console.log(`Respueta creada con el id: ${result}`);
  } catch (error) {
    console.error(error);
    // return h
    //   .view('ask', {
    //     title: 'Crear pregunta',
    //     error: 'Problemas creando la pregunta',
    //   })
    //   .code(500)
    //   .takeover();
  }
  return h.redirect(`/question/${req.payload.id}`);
}

module.exports = {
  answerQuestion,
};
