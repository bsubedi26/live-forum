const setLoginError = () => {
  return async hook => {
    const { email } = hook.data;

    const userService = hook.app.service('users');
    const res = await userService.find({ query: { email } });
    const user = res.data[0];

    if (hook.error.message === 'Invalid login') {
      // console.log('USER EXISTS BUT WRONG PASSWORD ', hook.error.message);
      if (user.login_attempts > 0) {

        const response = await userService.patch(user.id, { login_attempts: user.login_attempts - 1 });
        hook.error.message = response.login_attempts === 0
          ? 'Invalid Password. This is your last login attempt!'
          : `Invalid Password. You have ${response.login_attempts} login attempts remaining!`;
      }
    }

    return hook;
  };
};

module.exports = setLoginError;