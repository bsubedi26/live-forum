'use strict';
const { fastJoin } = require('feathers-hooks-common');

const commentJoins = {
  joins: {
    comments: () => async (forum, hook) => {
      forum.comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
    },
    creatingUser: () => async (forum, hook) => {
      forum.creatingUser = await hook.app.service('user').find({ query: { id: forum.creator_id } });
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
      // fastJoin(commentJoins),
      // populate({
      //   schema: {
      //     include: [{
      //       service: 'comment',
      //       nameAs: 'comments',
      //       parentField: 'id',
      //       childField: 'forum_id'
      //     }]
      //   }
      // })
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
