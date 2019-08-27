// Initializes the `movies` service on path `/movies`
const createService = require('feathers-objection')
const createModel = require('../../models/comments.model')
const hooks = require('./comments.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    model: Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/comments', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comments')

  service.hooks(hooks)

  app.publish(() => app.channel('authenticated', 'anonymous'))
}