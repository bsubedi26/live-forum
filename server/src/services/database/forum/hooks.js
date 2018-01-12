'use strict';
const { fastJoin } = require('feathers-hooks-common');
const { userLoader, commentsLoader } = require('hooks/batchLoaders');

const resolvers = {
  before: hook => {
    hook._userLoader = userLoader(hook);
    hook._commentsLoader = commentsLoader(hook);
  },

  joins: {
    _creator: () => async (forum, hook) => {
      let user = await hook._userLoader.load(forum.creator_id);
      forum._creator = user;
    },
    _comments: () => async (forum, hook) => {
      let comments = await hook._commentsLoader.load(forum.id);
      forum._comments = comments;
    },
  }
};

module.exports = {
  before: {
    all: [],
    find: [
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
