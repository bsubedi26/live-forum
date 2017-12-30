const userLocal = require('./user/local');
const userOAuth = require('./user/oauth');
const forum = require('./forum');
const comment = require('./comment');
const topic = require('./topic');

module.exports = function (app) {
  app.configure(userLocal);
  app.configure(userOAuth);
  app.configure(forum);
  app.configure(comment);
  app.configure(topic);
};
