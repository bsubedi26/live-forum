// Application before/after/error hooks that runs for all services
const colorlogger = require('./hooks/colorlogger')
const setUpdatedAtColumn = require('./hooks/setUpdatedAtColumn')
const updateParamQuery = require('./hooks/updateParamQuery')
const { validateEmptyData } = require('./hooks/validate')

module.exports = {
  before: {
    all: [
      colorlogger()
    ],
    find: [updateParamQuery('$sort', { updated_at: -1 })],
    get: [],
    create: [
      validateEmptyData
    ],
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
