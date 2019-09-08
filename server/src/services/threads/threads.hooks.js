const { authenticate } = require('@feathersjs/authentication').hooks
const { fastJoin } = require('feathers-hooks-common')
const { restrictToOwner } = require('feathers-authentication-hooks')
const { UserLoader, CommentLoader } = require('../../hooks/batchLoaders')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt')
    ],
    update: [
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ],
    patch: [
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ],
    remove: [
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ]
  },

  after: {
    all: [
      fastJoin({
        before: hook => {
          UserLoader.set(hook)
          CommentLoader.set(hook)
        },
        joins: {
          user: UserLoader.use('creator_id'),
          comments: CommentLoader.use('id')
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
