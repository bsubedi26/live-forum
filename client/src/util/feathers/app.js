import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import { logger } from './hooks'

const HOST =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3030'
    : typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3030')

export const storageKey = 'feathers-jwt'

const socket = io(HOST)

const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({
    storage: window.localStorage,
    storageKey
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
