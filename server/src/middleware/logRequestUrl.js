const chalk = require('chalk');

module.exports = function() {
  return function(req, res, next) {
    console.log(chalk.magenta.bold(req.url));
    // req.feathers.message = 'message from middleware'; // will be added to hook as hook.params.message
    next();
  };
};