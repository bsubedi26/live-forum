const fs = require('fs')
const path = require('path')
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
  const filename = process.env.SQLITE_PATH || connection.filename
  const absolute = path.isAbsolute(filename)
    ? filename
    : path.resolve(process.cwd(), filename)
  fs.mkdirSync(path.dirname(absolute), { recursive: true })
  const config = {
    client,
    connection: { ...connection, filename: absolute },
    ...isSqlite()
  }
  const db = knex(config)

  app.set('knex', db)
}
