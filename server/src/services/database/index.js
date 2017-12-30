const user = require('./user');
const forum = require('./forum');
const comment = require('./comment');
const topic = require('./topic');

module.exports = function (app) {
  app.configure(user);
  app.configure(forum);
  app.configure(comment);
  app.configure(topic);
};
