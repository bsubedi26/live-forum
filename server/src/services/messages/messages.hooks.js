const { fastJoin } = require('feathers-hooks-common')
const { UserLoader } = require('../../hooks/batchLoaders')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      fastJoin({
        before: UserLoader.set,
        joins: {
          _creator: UserLoader.use('creator_id')
        }
      })
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
}
