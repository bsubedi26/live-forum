const knex = require('knex')

const isSqlite = () => ({
  useNullAsDefault: true,
  pool: {
    afterCreate (conn, cb) {
      conn.run('PRAGMA foreign_keys = ON', cb)
    }
  }
})

module.exports = function (app) {
  const { client, connection } = app.get('sqlite3')
  //  const { client, connection } = app.get('pg')
  const config = {
    client,
    connection,
    ...isSqlite()
  }
  const db = knex(config)

  app.set('knex', db)
}
