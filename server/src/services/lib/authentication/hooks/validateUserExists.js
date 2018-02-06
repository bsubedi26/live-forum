const errors = require('@feathersjs/errors');

/*
 * async hook that validates if the incoming email
 * exists in the database.
*/

const validateUserExists = () => {
  return async hook => {
    const { email } = hook.data;
    if (hook.data.accessToken) {
      return hook;
    }

    const user = await hook.app.service('users').find({ query: { email } });

    if (user.total === 0 && user.data.length === 0) {
      throw new errors.BadRequest('Invalid email address. Please register for an account.');
    }

    return hook;
  };
};

module.exports = validateUserExists;