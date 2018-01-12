const BatchLoader = require('@feathers-plus/batch-loader');
const { getUniqueKeys, getResultsByKey } = BatchLoader;

const userLoader = (hook) => {
  return new BatchLoader(async (keys) => {
    const userService = hook.app.service('user');
    let uniq = getUniqueKeys(keys);

    let res = await userService.find({ query: { id: { $in: uniq }, $select: ['id', 'email'] } });
    return res.data;
  });
};

const commentsLoader = (hook) => {
  return new BatchLoader(async (keys) => {
    const commentService = hook.app.service('comment');
    let uniq = getUniqueKeys(keys);
    let getRecordKeyFunc = comment => comment.forum_id;

    let res = await commentService.find({ query: { forum_id: { $in: uniq } } });
    let results = getResultsByKey(keys, res.data, getRecordKeyFunc, '[]', { defaultElem: [] });
    return results;
  });
};

module.exports = {
  userLoader,
  commentsLoader
};