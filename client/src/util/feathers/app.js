import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { logger } from './hooks'

const HOST = 'http://localhost:3030'

const socket = io(HOST)

const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({
    storage: window.localStorage
  }))

app.io.on('connect_error', error => {
  console.log('Cannot connect to server using sockets. Closing connection... ', error)
  app.io.close()
})

/**
 *  FEATHERS GLOBAL HOOKS
*/
logger(app)

export default app
