const createService = require('feathers-knex')
const createModel = require('../../models/movies.model')
const hooks = require('./movies.hooks')

const name = 'movies'

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
  try {
    service.publish((d) => {
      console.log('d: ', d)
      return app.channel('anonymous')
      // return app.channel(['authenticated', 'anonymous'])
    })
  } catch (err) {
    console.log('err: ', err)
  }
}
