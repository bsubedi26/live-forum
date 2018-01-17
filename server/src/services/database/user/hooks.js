const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const validateUniqueUser = require('./hooks/validateUniqueUser');
const avatar = require('./hooks/avatar');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      validateUniqueUser(),
      hashPassword(),
      avatar(),
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
      // Make sure the password field is never sent to the client (MUST BE THE LAST HOOK)
      protect('password')
    ],
    find: [],
    get: [],
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
