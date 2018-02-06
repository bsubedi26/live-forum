const authentication = require('@feathersjs/authentication');
const validateUserExists = require('./hooks/validateUserExists');
const setLoginError = require('./hooks/setLoginError');
const validateLoginAttempts = require('./hooks/validateLoginAttempts');

module.exports = function (config) {

  return {
    before: {
      create: [
        // validateUserExists(),
        // validateLoginAttempts(),
        authentication.hooks.authenticate(config.strategies),
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },

    error: {
      create: [
        // setLoginError(),
      ]
    }
  };
}; 
