'use strict';
const { fastJoin } = require('feathers-hooks-common');
// const { authenticate } = require('feathers-authentication').hooks;
// const { populate } = require('feathers-hooks-common');
// const processMessage = require('../../hooks/process-message');


const userCommentCreatorJoins = {
  joins: {
    _user: () => async (comment, hook) => {
      let user = await hook.app.service('user').find({ query: { id: comment.creator_id } });
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
    all: [
      // populate({
      //   schema: {
      //     include: [{
      //       service: 'users',
      //       nameAs: 'user',
      //       parentField: 'userId',
      //       childField: '_id'
      //     }]
      //   }
      // })
    ],
    find: [
      fastJoin(userCommentCreatorJoins)
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
