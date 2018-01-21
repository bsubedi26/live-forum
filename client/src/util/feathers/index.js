import feathers from '@feathersjs/feathers';
import fSocketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

import io from 'socket.io-client';
// import fRest from '@feathersjs/client/dist/rest';
// import axios from 'axios';
import reduxifyAllServices, { requiresAuthServices } from './reduxServices';
import { logger, reAuthenticate, updateAtDate } from './hooks';


const HOST = process.env.NODE_ENV === 'production' ? '//live-forums.herokuapp.com' : 'http://localhost:3030';
// const HOST = 'http://localhost:3030';
const socket = io(HOST);
// const rest = fRest(HOST);
const app = feathers()
  .configure(fSocketio(socket))
  // .configure(rest.axios(axios))
  .configure(auth({
    storage: window.localStorage
  }));

const services = reduxifyAllServices(app);

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