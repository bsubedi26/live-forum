const databaseServices = require('./database');

module.exports = function (app) {
  app.configure(databaseServices);
};
