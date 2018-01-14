const { authenticate } = require('@feathersjs/authentication').hooks;
const { fastJoin } = require('feathers-hooks-common');
const { userLoader } = require('hooks/batchLoaders');

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
      authenticate('jwt')
    ],
    patch: [
      authenticate('jwt')
    ],
    remove: [
      authenticate('jwt')
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
