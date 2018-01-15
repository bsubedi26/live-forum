const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const { userLoader } = require('hooks/batchLoaders');
const { restrictToOwner } = require('feathers-authentication-hooks');

const commentCreatorResolvers = {
  before: hook => {
    hook._userLoader = userLoader(hook);
  },

  joins: {
    _creator: () => async (comment, hook) => {
      let user = await hook._userLoader.load(comment.creator_id);
      comment._creator = user;
    }
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt')
    ],
    update: [
      authenticate('jwt'),
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ],
    patch: [
      authenticate('jwt'),
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ],
    remove: [
      authenticate('jwt'),
      restrictToOwner({ idField: 'id', ownerField: 'creator_id' })
    ]
  },

  after: {
    all: [
      fastJoin(commentCreatorResolvers)
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
