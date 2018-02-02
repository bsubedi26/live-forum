const errors = require('@feathersjs/errors');

const validateLoginAttempts = () => {
  return async hook => {
    const { email } = hook.data;
    const userService = hook.app.service('users');
    const res = await userService.find({ query: { email } });
    const user = res.data[0];

    if (user.login_attempts === 0) {
      // reset login attempts after one minute
      setTimeout(() => {
        userService.patch(user.id, { login_attempts: 4 });
      }, 10 * 1000);

      throw new errors.Forbidden('You have NO login attempts remaining. Try again after 24 hours!');
    }

    return hook;
  };
};

module.exports = validateLoginAttempts;