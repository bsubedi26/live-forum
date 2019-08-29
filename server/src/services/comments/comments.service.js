const createService = require('feathers-knex')
const createModel = require('../../models/comments.model')
const hooks = require('./comments.hooks')

const name = 'movies'

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name,
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use(`/${name}`, createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service(name)

  service.hooks(hooks)

  app.publish(() => app.channel('authenticated', 'anonymous'))
}
