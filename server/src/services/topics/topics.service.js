const createService = require('feathers-knex')
const createModel = require('../../models/topics.model')
const hooks = require('./topics.hooks')

const name = 'topics'

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
