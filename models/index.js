'use strict';
const firebase = require('firebase-admin');
const serviceAccount = require('../config/firebase-admin');
const { config } = require('../config/index');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: config.firebaseDbUrl,
});

const db = firebase.database();

const Users = require('./users');

module.exports = {
  users: new Users(db),
};
