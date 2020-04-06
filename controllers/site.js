'use strict';

function register(req, h) {
  return h.view('register', {
    title: 'Registro',
  });
}

function login(req, h) {
  return h.view('login', {
    title: 'Ingrese',
  });
}

function home(req, h) {
  return h.view('index', {
    title: 'home',
  });
}

module.exports = {
  register,
  home,
  login,
};
