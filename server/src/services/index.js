const movies = require('./movies/movies.service')
const users = require('./users/users.service')
const topics = require('./topics/topics.service')
const threads = require('./threads/threads.service')
const comments = require('./comments/comments.service')

module.exports = function (app) {
  app.configure(movies)
  app.configure(users)
  app.configure(topics)
  app.configure(threads)
  app.configure(comments)
}
