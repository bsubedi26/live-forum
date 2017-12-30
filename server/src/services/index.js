const databaseServices = require('./database');
const libServices = require('./lib');

module.exports = function (app) {
  app.configure(databaseServices);
  app.configure(libServices);
};
