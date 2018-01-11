'use strict';
// const { joinUser, joinComments, joinCommentCreator, joinsForGet } = require('./hooks/index');
const { fastJoin } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { loaderFactory, getUniqueKeys, getResultsByKey } = BatchLoader;

const commentJoins = {
  before: hook => {
    // const user = hook.app.service('user');
    
    const userBatchLoader = new BatchLoader(async (keys, context) => {
      context = hook;
      const userService = context.app.service('user');
      // console.log('====================================');
      // console.log('keys ', keys);
      // console.log('====================================');
      let uniq = getUniqueKeys(keys);
      // console.log('====================================');
      // console.log('getUniqueKeys(keys) ', uniq);
      // console.log('====================================');
      let res = await userService.find({ query: { id: { $in: uniq } } });
      // return getResultsByKey(keys, res, user => user.id, '');

      // console.log('====================================');
      // console.log('res ', res);
      // console.log('====================================');
      return res.data;
    });

    const commentsBatchLoader = new BatchLoader(async (keys, context) => {
      context = hook;
      const commentService = context.app.service('comment');
      console.log('====================================');
      console.log('keys ', keys);
      console.log('====================================');
      let uniq = getUniqueKeys(keys);
      console.log('====================================');
      console.log('uniq ', uniq);
      console.log('====================================');
      let getRecordKeyFunc = comment => {
        // console.log('ccccccccccccccccc ', comment);
        return comment.id;
        // return comment.data.map(item => item.id);
      };

      let res = await commentService.find({ query: { forum_id: { $in: uniq } } });
      let results = getResultsByKey(keys, res, getRecordKeyFunc, '[]', { defaultElem: [] });
      
      console.log('====================================');
      // console.log('res ', res);
      console.log('results ', results);
      console.log('====================================');
      return results;
    });
    

    hook._userBatchLoader = userBatchLoader;
    hook._commentsBatchLoader = commentsBatchLoader;
    // hook._loaders = { user: {} };
    // hook._loaders.user.id = loaderFactory(user, 'id', false)(hook);
  },

  joins: {
    _user: () => async (forum, hook) => {
      // let user = await hook._loaders.user.id.load(forum.creator_id);
      let user = await hook._userBatchLoader.load(forum.creator_id);
      forum._user = user;
    },
    _comments: () => async (forum, hook) => {
      // let comments = await hook.app.service('comment').find({ query: { forum_id: forum.id } });
      // let comments = await hook._commentsBatchLoader.load(forum.id);
      let comments = await hook._commentsBatchLoader.loadMany(forum.id);
      forum._comments = comments;
    },
  }
};

const afterFind = () => {
  return async hook => {
    let a = userBatchLoader.load(6);
    console.log('====================================');
    console.log('aaaaaaaaaaa ', a);
    console.log('====================================');
    // let forumsArray = hook.result.data;
    // forumsArray.map(item => {
    //   let { creator_id } = item;
    //   item._works = userBatchLoader.load(creator_id);
    //   return item;
    // });

    return hook;
  };
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
    find: [
      // afterFind()
      // joinUser(),
      // joinComments(),
      // joinCommentCreator()
    ],
    get: [
      // joinsForGet()
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
