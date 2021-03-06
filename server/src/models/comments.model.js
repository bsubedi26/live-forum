const TABLE_NAME = 'comments'

module.exports = function (app) {
  const knex = app.get('knex')

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id').primary()
        table.string('comment').notNullable()

        table.integer('thread_id').unsigned().references('threads.id').onDelete('cascade')
        table.integer('creator_id').unsigned().references('users.id').onDelete('cascade')

        table.timestamps(true, true)
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return knex
}
