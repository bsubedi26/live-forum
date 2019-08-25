const user = require('./user');
const thread = require('./thread');
const comment = require('./comment');
const topic = require('./topic');

module.exports = function (app) {
  app.configure(user);
  app.configure(topic);
  app.configure(thread);
  app.configure(comment);
};
