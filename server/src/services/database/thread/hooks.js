const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const { userLoader, commentsLoader } = require('hooks/batchLoaders');
const { restrictToOwner } = require('feathers-authentication-hooks');

const resolvers = {
  before: hook => {
    hook._userLoader = userLoader(hook);
    hook._commentsLoader = commentsLoader(hook);
  },

  joins: {
    _creator: () => async (thread, hook) => {
      console.log('thread.creator_id ', thread.creator_id);
      let user = await hook._userLoader.load(thread.creator_id);
      thread._creator = user;
    },
    _comments: () => async (thread, hook) => {
      let comments = await hook._commentsLoader.load(thread.id);
      thread._comments = comments;
    },
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
      fastJoin(resolvers)
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
