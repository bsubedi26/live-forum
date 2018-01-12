// Application hooks that run for every service
const logger = require('./hooks/logger');
const { iff } = require('feathers-hooks-common');
const { isSqlite, stringifyJsonForSqlite } = require('./hooks/sqlite');

module.exports = {
  before: {
    all: [
      logger(),
      iff((isSqlite()), stringifyJsonForSqlite())
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      logger(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ 
      logger()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
