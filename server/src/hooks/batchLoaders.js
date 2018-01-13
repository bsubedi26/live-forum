const BatchLoader = require('@feathers-plus/batch-loader');
const { getUniqueKeys, getResultsByKey } = BatchLoader;

/*
 **** BATCH LOADER FUNCTIONS ****
*/
const getUsersUsingIds = (hook) => {
  return async (ids) => {
    const userService = hook.app.service('users');
    let idArray = getUniqueKeys(ids);

    let response = await userService.find({ query: { id: { $in: idArray }, $select: ['id', 'email'] } });
    return response.data;
  };
};

const getCommentsUsingIds = (hook) => {
  return async (ids) => {
    const commentService = hook.app.service('comments');
    let idArray = getUniqueKeys(ids);
    let getRecordKeyFunc = comment => comment.thread_id;

    let response = await commentService.find({ query: { thread_id: { $in: idArray } } });
    let results = getResultsByKey(idArray, response.data, getRecordKeyFunc, '[]', { defaultElem: [] });
    return results;
  };
};


/*
 **** BATCH LOADERS ****
*/
const userLoader = (hook) => new BatchLoader(getUsersUsingIds(hook));
const commentsLoader = (hook) => new BatchLoader(getCommentsUsingIds(hook));

module.exports = {
  userLoader,
  commentsLoader
};