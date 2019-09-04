const { Messages } = require('./messages.class')
const createModel = require('../../models/messages.model')
const hooks = require('./messages.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/messages', new Messages(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('messages')

  service.hooks(hooks)
  service.publish((data, context) => {
    // console.log('data: ', data)
    const currentChannel = app.channel(data.channel)
    return currentChannel
    // return currentChannel
    //   .filter(connection => {
    //     if (!connection.user) return true // send message to not logged in users
    //     return connection.user.id !== data.creator_id
    //   })
  })
}
