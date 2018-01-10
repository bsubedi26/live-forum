'use strict';
const { joinUser, joinComments, joinCommentCreator, joinsForGet } = require('./hooks/index');
// const { fastJoin } = require('feathers-hooks-common');
// const BatchLoader = require('@feathers-plus/batch-loader');
// const { loaderFactory } = BatchLoader;

// const commentJoins = {
//   before: hook => {
//     const user = hook.app.service('user');
//     hook._loaders = { user: {} };
//     hook._loaders.user.id = loaderFactory(user, 'id', false)(hook);
//   },

//   joins: {
//     // _comments: () => async (forum, hook) => {
//     //   let comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
//     //   forum._comments = comments;
//     // },
//     _user: () => async (forum, hook) => {
//       let query = { id: forum.creator_id, $select: ['id', 'email', 'created_at', 'updated_at'] };
//       // let user = await hook.app.service('user').find({ query });
//       let usersById = await hook.app.service('user').find({ query: {id: {$in: [1,2,3]}} });
//       console.log(usersById);
//       forum._user = {};
//     }
//   }
// };

// const commentJoins = {
//   joins: {
//     // _comments: () => async (forum, hook) => {
//     //   let comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
//     //   forum._comments = comments;
//     // },
//     _user: () => async (forum, hook) => {
//       let query = { id: forum.creator_id, $select: ['id', 'email', 'created_at', 'updated_at'] };
//       let user = await hook.app.service('user').find({ query });
//       forum._user = user;
//     }
//   }
// };

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
      // fastJoin(commentJoins)
    ],
    find: [
      joinUser(),
      joinComments(),
      joinCommentCreator()
    ],
    get: [
      joinsForGet()
    ],
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
