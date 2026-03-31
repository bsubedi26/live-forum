const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const logger = require('./utils/logger')
const authentication = require('./utils/authentication')

const knex = require('./knex')

const app = express(feathers())

// Load app/express configuration
app.configure(configuration())
  .use(cors())
  .use(helmet())
  .use(compress())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))
  .use('/', express.static(app.get('public')))

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next()
    if (req.path.startsWith('/socket.io')) return next()
    if (req.path.includes('.')) return next()
    const accept = req.headers.accept || ''
    if (!accept.includes('text/html')) return next()
    res.sendFile(path.join(app.get('public'), 'index.html'))
  })
}

// Load Feathers Core
app.configure(express.rest())
app.configure(knex)
app.configure(socketio({
  pingInterval: 10000,
  pingTimeout: 50000
}))
  .configure(middleware)
  .configure(authentication)
  .configure(services)
  .configure(channels)

// Load Final handlers
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

module.exports = app
