const joinCommentCreator = () => {
  return async hook => {
    const { comments } = hook.params.query
    const commentCreatorId = comments.data.map(item => item.creator_id)
    const commentCreators = await hook.app.service('user').find({ query: { id: { $in: commentCreatorId } } })

    hook.result.data.map((item) => {
      item._comments.map(comment => {
        commentCreators.data.forEach(user => {
          if (user.id === comment.creator_id) {
            delete user.password
            comment._creator = user.email
          }
        })
        return comment
      })
      return item
    })

    return hook
  }
}

module.exports = joinCommentCreator
