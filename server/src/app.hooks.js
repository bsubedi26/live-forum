// Application hooks that run for every service
// const { iff } = require('feathers-hooks-common')
const colorlogger = require('./hooks/colorlogger')

module.exports = {
  before: {
    all: [
      colorlogger()
    ],
    find: [],
    get: [],
    create: [],
    update: [
    ],
    patch: [
      // iff((isRest()), preventChangeIfNoId())
    ],
    remove: [
    ]
  },

  after: {
    all: [
      colorlogger()
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
      colorlogger()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
