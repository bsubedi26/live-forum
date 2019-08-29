const createService = require('feathers-knex')
const createModel = require('../../models/threads.model')
const hooks = require('./threads.hooks')

const name = 'threads'

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
  service.publish(() => {
    return app.channel('authenticated', 'anonymous')
  })
}
