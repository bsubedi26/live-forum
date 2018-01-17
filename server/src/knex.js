const knex = require('knex');

module.exports = function (app) {
  const { client, connection, useNullAsDefault } = app.get('sqlite3');
  // const { client, connection } = app.get('postgres');

  const db = knex({
    client, connection, useNullAsDefault,
    pool: {
      afterCreate(conn, cb) {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  });
  // const db = knex({ client, connection });

  app.set('knexClient', db);
};
