'use strict';
const { answers } = require('../models/index');
async function setAnswerRight(questionId, answerId, user) {
  let result;
  try {
    result = await answers.setAnswerRight(questionId, answerId, user);
  } catch (error) {
    console.error(error);
    return false;
  }
  return result;
}

module.exports = {
  setAnswerRight,
};
