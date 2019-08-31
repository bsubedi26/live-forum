const { Users } = require('./users.class')
const createModel = require('../../models/users.model')
const hooks = require('./users.hooks')

const name = 'users'

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name,
    Model,
    paginate
  }

  app.use(`/${name}`, new Users(options, app))

  const service = app.service(name)

  service.hooks(hooks)
  service.publish(data => app.channel(['authenticated', 'anonymous']))
}
