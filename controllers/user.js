'use strict';

function createUser(req, h) {
  return h.response(req.payload);
}

module.exports = {
  createUser,
};
