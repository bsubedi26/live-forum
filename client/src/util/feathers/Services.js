import app from 'util/feathers'

const Services = {
  users: app.service('users'),
  threads: app.service('threads'),
  topics: app.service('topics'),
  comments: app.service('comments'),
  'channels/rooms': app.service('channels/rooms'),
  users_followers: app.service('users_followers'),
  movies: app.service('movies'),
  messages: app.service('messages')
}

export const servicePaths = Object.keys(Services).map(key => Services[key].path)

export default Services
