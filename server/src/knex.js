const knex = require('knex')

module.exports = function (app) {
  const { client, connection } = app.get('sqlite3')
  // const { client, connection } = app.get('mysql')
  const config = {
    client,
    connection,
    useNullAsDefault: true,
    pool: {
      afterCreate (conn, cb) {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  }
  const db = knex(config)

  app.set('knex', db)
}
