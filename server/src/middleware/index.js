const logRequestUrl = require('./logRequestUrl')

const moduleExports = function (app) {
  app.use(logRequestUrl())
}

module.exports = moduleExports
