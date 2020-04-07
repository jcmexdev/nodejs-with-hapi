'use strict';
const { answers, questions } = require('../models/index');
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

async function getLast(amount) {
  let data;
  try {
    data = await questions.getLast(10);
  } catch (error) {
    console.error(error);
  }
  console.log('Se ejecuto el método');
  return data;
}

module.exports = {
  setAnswerRight,
  getLast,
};
