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
}

module.exports = Answer;
