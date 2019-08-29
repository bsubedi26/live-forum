const BatchLoader = require('@feathers-plus/batch-loader')

/*
 **** BATCH LOADER FUNCTIONS ****
*/
const getUsersUsingIds = (hook) => {
  return async (ids) => {
    const userService = hook.app.service('users')

    const response = await userService.find({ query: { id: { $in: ids }, $select: ['id', 'email', 'avatar'] } })
    const results = BatchLoader.getResultsByKey(ids, response.data, user => user.id, '!')
    return results
  }
}

const getCommentsUsingIds = (hook) => {
  return async (ids) => {
    const commentService = hook.app.service('comments')
    const response = await commentService.find({ query: { thread_id: { $in: ids }, $sort: { updated_at: '-1' } } })
    const results = BatchLoader.getResultsByKey(ids, response.data, comment => comment.thread_id, '[]', { defaultElem: [] })
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
