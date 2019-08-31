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
  // service.publish((data, context) => {
  //   // Filter the channels to only authenticated
  //   return app.channel(`room/${data.roomId}`)
  //     .filter(connection => connection.user._id.toString() !== data.userId.toString())
  // })
}
