const joinComments = () => {
  return async hook => {
    let forumsArray = hook.result.data;
    let forumIds = forumsArray.map(item => item.id);
    // console.log(forumIds);
    let comments = await hook.app.service('comment').find({ query: { forum_id: { $in: forumIds } } });
    hook.params.query.comments = comments;

    hook.result.data.map((item) => {
      item._comments = [];
      comments.data.forEach(comment => {
        if (item.id === comment.forum_id) {
          item._comments = [...item._comments, comment];
          return item;
        }
      });
      return item;
    });

    return hook;
  };
};

module.exports = joinComments;