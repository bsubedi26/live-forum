const createService = require('feathers-objection')
const createModel = require('../../models/topics.model')
const hooks = require('./topics.hooks')

module.exports = function (app) {
  const model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'topics',
    model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/topics', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('topics')

  service.hooks(hooks)
}
