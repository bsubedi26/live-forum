const { authenticate } = require('@feathersjs/authentication').hooks
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks

// const removeField = require('../../hooks/removeField')
const validateUniqueUser = require('./hooks/validateUniqueUser')
const makeAvatar = require('./hooks/avatar')

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      validateUniqueUser(),
      hashPassword('password'),
      makeAvatar()
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt')
    ],
    patch: [
      hashPassword('password'),
      authenticate('jwt')
    ],
    remove: [
      authenticate('jwt')
    ]
  },

  after: {
    all: [
      // removeField('avatar'),
      protect('password') // Make sure the password field is never sent to the client
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
