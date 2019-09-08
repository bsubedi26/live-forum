const BatchLoader = require('@feathers-plus/batch-loader')

/*
 **** PRIVATE BATCH LOADER FUNCTIONS ****
*/
const getUsersUsingIds = (hook) => async (argIds) => {
  const userService = hook.app.service('users')
  const ids = BatchLoader.getUniqueKeys(argIds)

  try {
    const response = await userService.find({ query: { id: { $in: ids }, $select: ['id', 'email', 'avatar'] } })
    const results = BatchLoader.getResultsByKey(ids, response.data, user => user.id, '!')
    return results
  } catch (error) {
    console.error('getUsersUsingIds error: ', error)
  }
}

const getCommentsUsingIds = (hook) => async (argIds) => {
  const commentService = hook.app.service('comments')
  const ids = BatchLoader.getUniqueKeys(argIds)

  try {
    const response = await commentService.find({ query: { thread_id: { $in: ids }, $sort: { updated_at: '-1' } } })
    const results = BatchLoader.getResultsByKey(ids, response.data, comment => comment.thread_id, '[]', { defaultElem: [] })
    return results
  } catch (error) {
    console.error('getCommentsUsingIds error: ', error)
  }
}

const _userLoader = hook => new BatchLoader(getUsersUsingIds(hook))
const _commentLoader = hook => new BatchLoader(getCommentsUsingIds(hook))

/*
 **** PUBLIC BATCH LOADERS ****
*/

const UserLoader = {
  set: hook => {
    hook._userLoader = _userLoader(hook)
  },
  use: (joinById = 'creator_id', setFieldAs = '_user') => () => async (data, hook) => {
    const loaderData = await hook._userLoader.load(data[joinById])
    data[setFieldAs] = loaderData
  }
}

const CommentLoader = {
  set: hook => {
    hook._commentLoader = _commentLoader(hook)
  },
  use: (joinById = 'id', setFieldAs = '_comments') => () => async (data, hook) => {
    const loaderData = await hook._commentLoader.load(data[joinById])
    data[setFieldAs] = loaderData
  }
}
module.exports = {
  UserLoader,
  CommentLoader
}
