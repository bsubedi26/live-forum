const TABLE_NAME = 'users_followers'

const makeFkUserRef = (table, columnName) => {
  return table.integer(columnName).notNullable().unsigned().references('users.id').onDelete('cascade')
}

module.exports = function (app) {
  const knex = app.get('knex')

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id')

        makeFkUserRef(table, 'follower_id')
        makeFkUserRef(table, 'following_id')
        table.unique(['follower_id', 'following_id'])
        table.timestamps(true, true)
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return knex
}
