// Application hooks that run for every service
const { iff } = require('feathers-hooks-common');
const logger = require('./hooks/logger');
const { isSqlite, stringifyJsonForSqlite } = require('./hooks/sqlite');
const isRest = require('./hooks/isRest');
const preventChangeIfNoId = require('./hooks/preventChangeIfNoId');


module.exports = {
  before: {
    all: [
      logger(),
      iff((isSqlite()), stringifyJsonForSqlite()),
    ],
    find: [],
    get: [],
    create: [],
    update: [
      iff((isRest()), preventChangeIfNoId())
    ],
    patch: [
      iff((isRest()), preventChangeIfNoId())
    ],
    remove: [
      iff((isRest()), preventChangeIfNoId())
    ]
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
