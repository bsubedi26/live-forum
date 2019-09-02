// Application before/after/error hooks that runs for all services
const colorlogger = require('./hooks/colorlogger')
const setUpdatedAtColumn = require('./hooks/setUpdatedAtColumn')
const updateParamQuery = require('./hooks/updateParamQuery')

module.exports = {
  before: {
    all: [
      colorlogger()
    ],
    find: [updateParamQuery({ updated_at: -1 })],
    get: [],
    create: [],
    update: [
      setUpdatedAtColumn
    ],
    patch: [
      setUpdatedAtColumn
    ],
    remove: []
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
