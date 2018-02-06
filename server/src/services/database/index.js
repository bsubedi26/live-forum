const user = require('./user');
const thread = require('./thread');
const comment = require('./comment');
const topic = require('./topic');
const blog = require('./blog');

module.exports = function (app) {
  app.configure(user);
  app.configure(topic);
  app.configure(thread);
  app.configure(comment);
  app.configure(blog);
};
