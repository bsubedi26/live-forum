const BatchLoader = require('@feathers-plus/batch-loader')
const { getUniqueKeys, getResultsByKey } = BatchLoader

/*
 **** BATCH LOADER FUNCTIONS ****
*/
const getUsersUsingIds = (hook) => {
  return async (ids) => {
    const userService = hook.app.service('users')
    const idArray = getUniqueKeys(ids)
    const getRecordKeyFunc = user => user.id

    const response = await userService.find({ query: { id: { $in: idArray }, $select: ['id', 'email', 'avatar'] } })
    const results = getResultsByKey(idArray, response.data, getRecordKeyFunc, '!')
    return results
  }
}

const getCommentsUsingIds = (hook) => {
  return async (ids) => {
    const commentService = hook.app.service('comments')
    const idArray = getUniqueKeys(ids)
    const getRecordKeyFunc = comment => comment.thread_id

    const response = await commentService.find({ query: { thread_id: { $in: idArray }, $sort: { updated_at: '-1' } } })
    // let response = await commentService.find({ query: { thread_id: { $in: idArray } } });
    const results = getResultsByKey(idArray, response.data, getRecordKeyFunc, '[]', { defaultElem: [] })
    return results
  }
}

/*
 **** BATCH LOADERS ****
*/
const userLoader = (hook) => new BatchLoader(getUsersUsingIds(hook))
const commentsLoader = (hook) => new BatchLoader(getCommentsUsingIds(hook))

module.exports = {
  userLoader,
  commentsLoader
}
