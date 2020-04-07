'use strict';

class Answer {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('questions');
  }
  async answer(data, user) {
    const newData = { ...data };
    const newAnswer = await this.collection
      .child(newData.id)
      .child('answers')
      .push();
    newAnswer.set({
      text: newData.answer,
      user: user,
    });
    return newAnswer;
  }

  async setAnswerRight(questionId, answerId, user) {
    const query = this.collection.child(questionId).once('value');
    const question = query.val();
    const answers = question.answers;
    if (!user.email === question.owner.email) {
      return false;
    }
    for (let key in answers) {
      answers[key].correct = key === answerId;
    }

    const update = await this.collection
      .child(questionId)
      .child('answers')
      .update(answers);
    return update;
  }
}

module.exports = Answer;
