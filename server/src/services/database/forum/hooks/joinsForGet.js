const joinsForGet = () => {
  return async hook => {
    const { creator_id, id } = hook.result;

    let user = await hook.app.service('user').get(creator_id);
    let comments = await hook.app.service('comment').find({ query: { forum_id: id } });

    delete user.password;
    hook.result._creator = user;
    hook.result._comments = comments;
    return hook;
  };
};

module.exports = joinsForGet;