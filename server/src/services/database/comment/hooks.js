'use strict';
const { fastJoin } = require('feathers-hooks-common');
// const { authenticate } = require('feathers-authentication').hooks;

const userCommentCreatorJoins = {
  joins: {
    _user: () => async (comment, hook) => {
      let query = { id: comment.creator_id, $select: ['id', 'email', 'created_at', 'updated_at'] };
      let user = await hook.app.service('user').find({ query });
      comment._user = user;
    }
  }
};

module.exports = {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      // fastJoin(userCommentCreatorJoins)
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
