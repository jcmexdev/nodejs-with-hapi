'use strict';
const handlebars = require('handlebars');

function registerHelpers(answers) {
  handlebars.registerHelper('answerNumber', (answers) => {
    if (answers === undefined) {
      return 0;
    }
    const keys = Object.keys(answers);
    return keys.length;
  });

  handlebars.registerHelper('ifEquals', (owner, currentUser, options) => {
    if (owner == currentUser) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  return handlebars;
}

module.exports = registerHelpers();
