const chalk = require('chalk');

module.exports = function() {
  return function(req, res, next) {
    console.log(chalk.magenta.bold(req.url));
    // req.feathers.message = 'woo from middleware'; // will be added to hook as hook.params.message
    next();
  };
};