// const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const validateUniqueUser = require('./hooks/validateUniqueUser');
const { omit } = require('lodash');

const omitPasswordForFastJoins = () => async hook => {
  if (hook.result.data && hook.result.data[0] && hook.result.data[0].password) {
    // delete hook.result.data[0].password
    hook.result = omit(hook.result.data[0], 'password')
  }
  return hook;
};

module.exports = {
  before: {
    all: [],
    find: [
      // authenticate('jwt')
    ],
    get: [],
    create: [
      validateUniqueUser(),
      hashPassword()
    ],
    update: [ 
      hashPassword()
    ],
    patch: [
      hashPassword()
    ],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // MUST BE THE LAST HOOK
      protect('password'),
    ],
    find: [
      // omitPasswordForFastJoins()
    ],
    get: [
      // omitPasswordForFastJoins()
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
