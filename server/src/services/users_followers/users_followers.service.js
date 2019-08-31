const createService = require('feathers-knex')
const createModel = require('../../models/users_followers.model')
const hooks = require('./users_followers.hooks')

const name = 'users_followers'

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name,
    Model,
    paginate
  }

  app.use(`/${name}`, createService(options))

  const service = app.service(name)

  service.hooks(hooks)
  service.publish(data => app.channel(['authenticated', 'anonymous']))
}
