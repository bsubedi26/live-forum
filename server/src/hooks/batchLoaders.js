const BatchLoader = require('@feathers-plus/batch-loader');
const { getUniqueKeys, getResultsByKey } = BatchLoader;

const userLoader = (hook) => {
  return new BatchLoader(async (keys) => {
    const userService = hook.app.service('user');
    let idArray = getUniqueKeys(keys);

    let response = await userService.find({ query: { id: { $in: idArray }, $select: ['id', 'email'] } });
    return response.data;
  });
};

const commentsLoader = (hook) => {
  return new BatchLoader(async (keys) => {
    const commentService = hook.app.service('comment');
    let idArray = getUniqueKeys(keys);
    let getRecordKeyFunc = comment => comment.forum_id;

    let response = await commentService.find({ query: { forum_id: { $in: idArray } } });
    let results = getResultsByKey(keys, response.data, getRecordKeyFunc, '[]', { defaultElem: [] });
    return results;
  });
};

module.exports = {
  userLoader,
  commentsLoader
};