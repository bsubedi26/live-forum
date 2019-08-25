const joinsForGet = () => {
  return async hook => {
    const { creator_id: creatorId, id } = hook.result

    const user = await hook.app.service('user').get(creatorId)
    const comments = await hook.app.service('comment').find({ query: { forum_id: id } })

    delete user.password
    hook.result._creator = user
    hook.result._comments = comments
    return hook
  }
}

module.exports = joinsForGet
