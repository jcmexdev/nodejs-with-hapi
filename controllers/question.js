'use strict';
const { writeFile } = require('fs');
const { join } = require('path');
const uuid = require('uuid/v1');
const { questions } = require('../models/index');

async function createQuestion(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }
  let { payload, state } = req;
  let result, filename;

  try {
    if (Buffer.isBuffer(payload.image)) {
      filename = `${uuid()}.png`;
      await writeFile(
        join(__dirname, '../public', 'uploads', filename),
        payload.image,
        function (err) {
          if (err) throw err;
          req.log('info', 'File upload success');
        }
      );
    }
    result = await questions.create(payload, state.user, filename);
    req.log('info', `Pregunta creada con el id: ${result}`);
  } catch (error) {
    req.log('error', error);
    return h
      .view('ask', {
        title: 'Crear pregunta',
        error: 'Problemas creando la pregunta',
      })
      .code(500)
      .takeover();
  }
  return h.redirect(`/question/${result}`);
}

module.exports = {
  createQuestion,
};
