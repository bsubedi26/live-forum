const joinUser = () => {
  return async hook => {
    let forumsArray = hook.result.data;
    let creatorIds = forumsArray.map(item => item.creator_id);
    // console.log(creatorIds);
    let users = await hook.app.service('user').find({ query: { id: { $in: creatorIds } } });
    // console.log(users);

    hook.result.data.map((item) => {
      users.data.forEach(user => {
        if (item.creator_id === user.id) {
          delete user.password;
          item._creator = user;
          return item;
        }
      });

      return item;
    });

    return hook;
  };
};

module.exports = joinUser;