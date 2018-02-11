import feathers from '@feathersjs/client/dist/feathers.min';
import auth from '@feathersjs/client/dist/authentication.min';
import fSocketio from '@feathersjs/client/dist/socketio.min';

import io from 'socket.io-client';

// import fRest from '@feathersjs/client/dist/rest';
// import axios from 'axios';
import reduxifyAllServices, { requiresAuthServices } from './reduxServices';
import { logger, reAuthenticate, updateAtDate } from './hooks';


const HOST = process.env.NODE_ENV === 'production' ? '//live-forums.herokuapp.com' : 'http://localhost:3030';
const socket = io(HOST);
// const rest = fRest(HOST);
const app = feathers()
  .configure(fSocketio(socket))
  // .configure(rest.axios(axios))
  .configure(auth({
    storage: window.localStorage
  }));

const services = reduxifyAllServices(app);

app.io.on('connect_error', error => {
  console.log('Cannot connect to server using sockets. Closing connection...');
  app.io.close();
});

export { services };

/**
 *  FEATHERS GLOBAL HOOKS 
*/
if (process.env.NODE_ENV === 'development') {
  logger(app);
}
else {
  // temporary console log override when in production
  console.log = function() {};
}

reAuthenticate(app, requiresAuthServices);
updateAtDate(app);

export default app;