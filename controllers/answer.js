'use strict';
const { answers } = require('../models/index');

async function answerQuestion(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }

  let result;
  try {
    result = await answers.answer(req.payload, req.state.user);
    console.log(`Respuesta creada con el id: ${result}`);
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

async function setAnswerRight(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }

  let result;
  let { questionId, answerId } = req.params;
  try {
    result = await req.server.methods.setAnswerRight(
      questionId,
      answerId,
      req.state.user
    );
  } catch (error) {
    console.error(error);
  }
  return h.redirect(`/question/${questionId}`);
}

module.exports = {
  answerQuestion,
  setAnswerRight,
};
