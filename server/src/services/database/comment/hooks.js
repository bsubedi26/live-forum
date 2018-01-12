'use strict';
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
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      fastJoin(commentCreatorResolvers)
    ],
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
