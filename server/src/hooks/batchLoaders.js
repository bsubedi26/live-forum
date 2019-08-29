const BatchLoader = require('@feathers-plus/batch-loader')

/*
 **** BATCH LOADER FUNCTIONS ****
*/
const getUsersUsingIds = (hook) => {
  return async (argIds) => {
    const userService = hook.app.service('users')
    const ids = BatchLoader.getUniqueKeys(argIds)

    try {
      const response = await userService.find({ query: { id: { $in: ids }, $select: ['id', 'email', 'avatar'] } })
      const results = BatchLoader.getResultsByKey(ids, response.data, user => user.id, '!')
      return results
    } catch (error) {
      console.log('error: ', error)
    }
  }
}

const getCommentsUsingIds = (hook) => {
  return async (argIds) => {
    const commentService = hook.app.service('comments')
    const ids = BatchLoader.getUniqueKeys(argIds)

    try {
      const response = await commentService.find({ query: { thread_id: { $in: ids }, $sort: { updated_at: '-1' } } })
      const results = BatchLoader.getResultsByKey(ids, response.data, comment => comment.thread_id, '[]', { defaultElem: [] })
      return results
    } catch (error) {
      console.log('error: ', error)
    }
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
