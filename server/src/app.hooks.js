// Application hooks that run for every service
// const { iff } = require('feathers-hooks-common')
const colorlogger = require('./hooks/colorlogger')
const setUpdatedAtColumn = require('./hooks/setUpdatedAtColumn')

module.exports = {
  before: {
    all: [
      colorlogger()
    ],
    find: [],
    get: [],
    create: [],
    update: [
      setUpdatedAtColumn
    ],
    patch: [
      setUpdatedAtColumn
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
