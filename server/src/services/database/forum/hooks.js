'use strict';
const { fastJoin, populate } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');

const { loaderFactory } = BatchLoader;

const postResolvers = {
  before: context => {
    context._loaders = { user: {} };
    context._loaders.user.id = loaderFactory(users, 'id', false)(context);
  },
  joins: {
    author: () => async (post, context) =>
      post.author = await context._loaders.user.id.load(post.userId),
    starers: () => async (post, context) => !post.starIds ? null :
      post.starers = await context._loaders.user.id.loadMany(post.starIds),
  }
};

const commentJoins = {
  before: hook => {
    const user = hook.app.service('user');
    hook._loaders = { user: {} };
    hook._loaders.user.id = loaderFactory(user, 'id', false)(hook);
  },

  joins: {
    // _comments: () => async (forum, hook) => {
    //   let comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
    //   forum._comments = comments;
    // },
    _user: () => async (forum, hook) => {
      let query = { id: forum.creator_id, $select: ['id', 'email', 'created_at', 'updated_at'] };
      let user = await hook.app.service('user').find({ query });
      forum._user = user;
    }
  }
};

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

const populateUser = () => {
  return populate({
    schema: {
      include: [
        {
          nameAs: '_user',
          service: 'user',
          parentField: 'creator_id',
          childField: 'id'
        },
        {
          nameAs: '_comments',
          service: 'comment',
          parentField: 'id',
          childField: 'forum_id'
        },

      ]
    }
  });
};

// const populateJoins = () => async hook => {
//   // console.log(hook);
//   const knex = hook.app.get('knexClient');
//   const { topic_id } = hook.params.query;

//   const query = knex.select(['forum.*', 'user.email', 'comment.comment'])
//     .from('forum')
//     .where({ topic_id })
//     .innerJoin('user', 'forum.creator_id', 'user.id')
//     .innerJoin('comment', 'forum.id', 'comment.forum_id');

//   const data = await query;
//   hook.result.POPULATE = data;

//   return hook;
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
      fastJoin(commentJoins)
    ],
    find: [
      // populateJoins(),
      // populateUser()
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
