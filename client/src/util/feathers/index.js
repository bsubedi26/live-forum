import feathers from '@feathersjs/client/dist/feathers.min';
import auth from '@feathersjs/client/dist/authentication.min';
import reduxifyAllServices, { requiresAuthServices } from './reduxServices';

import fSocketio from '@feathersjs/client/dist/socketio.min';
import io from 'socket.io-client';
// import fRest from '@feathersjs/client/dist/rest';
// import axios from 'axios';
// const HOST = process.env.NODE_ENV === 'production' ? '//feathers-example.herokuapp.com' : 'http://localhost:3030';

const HOST = 'http://localhost:3030';

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
 * FEATHERS GLOBAL HOOK LOGGER
*/
if (process.env.NODE_ENV === 'development') {
  app.hooks({
    before: {
      all: async hook => {
        /**
         * HACK TO FIX SERVICES THAT REQUIRE AUTHENTICATION AFTER BROWSER REFRESH
         * authenticate methods (create, update, patch, remove) for services (THREADS and COMMENTS)
        */
        const requiresAuthMethods = ['create', 'update', 'patch', 'remove'];

        if (requiresAuthServices.includes(hook.path) && requiresAuthMethods.includes(hook.method)) {
          // console.log('Requires Auth for service: ', hook.path);
          // console.log('Method requires auth! ', hook.method);
          await app.authenticate();
          return hook;
        }

        return hook;
      }
    },
    after: {
      all: hook => {
        let color = (['get', 'find'].indexOf(hook.method) === -1) ? 'blue' : 'green';
        console.log(`%c${hook.method} %c[${hook.path}]`, `color: ${color}; font-size: 16px;`, 'font-weight:bold; font-size: 18px;', hook);
      }
    },
    error: {
      all: hook => {
        console.log(`%c${hook.method} %c[${hook.path}]`, 'color: red; font-weight:bold; font-size: 18px;', 'font-weight:bold; font-size: 18px;', hook);
      }
    },
  });
}

export default app;