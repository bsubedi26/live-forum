import feathers from '@feathersjs/client/dist/feathers.min';
import auth from '@feathersjs/client/dist/authentication.min';
// import fSocketio from '@feathersjs/client/dist/socketio.min';
// import io from 'socket.io-client';
import fRest from '@feathersjs/client/dist/rest';
import reduxifyAllServices from './reduxServices';
import axios from 'axios';

// const HOST = process.env.NODE_ENV === 'production' ? '//feathers-example.herokuapp.com' : 'http://localhost:3030';
const HOST = 'http://localhost:3030';

// const socket = io(HOST);
const rest = fRest(HOST);

const app = feathers()
  // .configure(fSocketio(socket))
  .configure(rest.axios(axios))
  .configure(auth({
    storage: window.localStorage
  }));

const services = reduxifyAllServices(app);

export { services };
export default app;