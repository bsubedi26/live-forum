const logger = require('./utils/logger')
const app = require('./app')
const seedInitialData = require('./utils/seedInitialData')
const port = Number(process.env.PORT || app.get('port'))
const server = app.listen(port)

// process.on('unhandledRejection', (reason, p) =>
//   logger.error('Unhandled Rejection at: Promise ', p, reason)
// )

server.on('listening', async () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  try {
    logger.info('Seeding data...')
    await seedInitialData(app)
    logger.info('Initial data is ready')
  } catch (error) {
    logger.error('Failed to seed initial data: %s', error.message)
  }
})
