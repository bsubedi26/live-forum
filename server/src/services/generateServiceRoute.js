const Fs = require('fs')

const omitFiles = ['index.js', 'generateServiceRoute.js']

const getServices = (path = __dirname) => Fs.readdirSync(path).filter(file => !omitFiles.includes(file))

const generateServiceRoute = (app, dbAdapter = 'feathers-knex') => {
  const createService = require(dbAdapter)
  const files = getServices()

  files.forEach(name => {
    const createModel = require(`../models/${name}.model`)
    const hooks = require(`./${name}/${name}.hooks`)

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
    try {
      service.publish((d) => {
        console.log('d: ', d)
        return app.channel(['authenticated', 'anonymous'])
      })
    } catch (err) {
      console.log('err: ', err)
    }
  })
}

module.exports = generateServiceRoute
