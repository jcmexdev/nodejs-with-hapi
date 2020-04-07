'use strict';
const { questions } = require('../models/index');

function register(req, h) {
  if (req.state.user) {
    return h.redirect('/');
  }
  return h.view('register', {
    title: 'Registro',
    user: req.state.user,
  });
}

function login(req, h) {
  if (req.state.user) {
    return h.redirect('/');
  }
  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user,
  });
}

async function home(req, h) {
  let data = await req.server.methods.getLast(10);

  return h.view('index', {
    title: 'home',
    user: req.state.user,
    questions: data,
  });
}

function notFound(req, h) {
  return h.view('404', {}, { layout: 'error-layout' }).code(404);
}

function fileNotFound(req, h) {
  const response = req.response;
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404);
  }
  return h.continue;
}

function ask(req, h) {
  const { user } = req.state;
  if (!user) {
    return h.redirect('/login');
  }

  return h.view('ask', {
    title: 'Crear pregunta',
    user,
  });
}

async function viewQuestion(req, h) {
  let data;
  try {
    data = await questions.getOne(req.params.id);
    if (!data) {
      return notFound(req, h);
    }
  } catch (error) {
    req.log('error', error);
  }

  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question: data,
    key: req.params.id,
  });
}

module.exports = {
  register,
  home,
  login,
  notFound,
  fileNotFound,
  ask,
  viewQuestion,
};
