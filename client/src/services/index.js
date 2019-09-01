import app from 'util/feathers'

const Services = {
  User: app.service('users'),
  Thread: app.service('threads'),
  Topic: app.service('topics'),
  Comment: app.service('comments'),
  ChannelRoom: app.service('channels/rooms'),
  UserFollower: app.service('users_followers'),
  Movies: app.service('movies')
}

export default Services
