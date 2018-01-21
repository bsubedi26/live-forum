const errors = require('@feathersjs/errors');

/*
 * If the incoming email data already exists in the database
 * return an error message to display to the client.
*/

const validateUniqueUser = () => {
  return async hook => {
    const { email } = hook.data;

    const user = await hook.service.find({ query: { email } });
    if (user.total > 0) {
      // console.log('The provided user already exists: ', user);
      const userAlreadyExists = new errors.BadRequest('The provided email already exists. Try again.');
      throw userAlreadyExists;
    }

    return hook;
  };
};

module.exports = validateUniqueUser;
