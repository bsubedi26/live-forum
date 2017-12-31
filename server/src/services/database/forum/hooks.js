'use strict';
const { fastJoin } = require('feathers-hooks-common');

const commentJoins = {
  joins: {
    _comments: () => async (forum, hook) => {
      let comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
      forum._comments = comments;
    },
    _user: () => async (forum, hook) => {
      let user = await hook.app.service('user').find({ query: { id: forum.creator_id } });
      forum._user = user;
    }
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
      fastJoin(commentJoins)
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
