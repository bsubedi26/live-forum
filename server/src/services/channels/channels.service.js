class ChannelService {
  async create (data, params) {
    console.log('create data: ', data)
    if (params.connection && data.id) {
      this.app.channel(`${this.name}/${data.id}`).join(params.connection)
    }

    return data
  }

  async remove (id, params) {
    if (params.connection && id) {
      this.app.channel(`${this.name}/${id}`).leave(params.connection)
    }

    return { id }
  }

  async find () {
    return this.app.channels
  }

  async get (id) {
    return this.app.channels.filter(channel => channel === id)
  }

  setup (app, name = 'rooms') {
    this.app = app
    this.name = name
  }
}

module.exports = function (app) {
  const roomService = new ChannelService(app, 'rooms')
  app.use('/channels/rooms', roomService)

  const service = app.service('/channels/rooms')

  service.publish(data => app.channel(['authenticated', 'anonymous']))

// service.publish((data, context) => {
//   // Filter the channels to only authenticated
//   return app.channel(`room/${data.roomId}`)
//     .filter(connection => connection.user._id.toString() !== data.userId.toString())
// })
}
