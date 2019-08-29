import feathers from '@feathersjs/client/dist/feathers.min'
import auth from '@feathersjs/client/dist/authentication.min'
import fSocketio from '@feathersjs/client/dist/socketio.min'
import fReactive from 'feathers-reactive'

import io from 'socket.io-client'

import reduxifyAllServices from './reduxServices'
import { logger } from './hooks'

const HOST = 'http://localhost:3030'

const socket = io(HOST)

const app = feathers()
  .configure(fSocketio(socket))
  .configure(fReactive({
    idField: 'id'
  }))
  .configure(auth({
    storage: window.localStorage
  }))

const services = reduxifyAllServices(app)

app.io.on('connect_error', error => {
  console.log('Cannot connect to server using sockets. Closing connection... ', error)
  app.io.close()
})

// export const requiresAuthServices = ['threads', 'comments']

export const publicServices = ['users', 'topics']

export { services }

/**
 *  FEATHERS GLOBAL HOOKS
*/
logger(app)
// reAuthenticate(app, requiresAuthServices)

export default app
