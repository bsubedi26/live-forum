const movies = require('./movies/movies.service')
const users = require('./users/users.service')
const topics = require('./topics/topics.service')
const threads = require('./threads/threads.service')
const comments = require('./comments/comments.service')
const usersFollowers = require('./users_followers/users_followers.service')
const channels = require('./channels/channels.service')

const messages = require('./messages/messages.service.js')

// const generateServiceRoute = require('./generateServiceRoute')

module.exports = function (app) {
  app.configure(movies)
  app.configure(users)
  app.configure(topics)
  app.configure(threads)
  app.configure(comments)
  app.configure(usersFollowers)
  app.configure(channels)
  app.configure(messages)
}
