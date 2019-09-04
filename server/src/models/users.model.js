const TABLE_NAME = 'users'

function createModel (app) {
  const knex = app.get('knex')

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id')

        table.string('email').unique().notNullable()
        table.string('password').notNullable()

        table.string('avatar')
        table.integer('login_attempts').defaultTo(4)
        table.boolean('active').defaultTo(true)
        table.string('roles').defaultTo('member')

        table.timestamps(true, true)
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
  return knex
}

module.exports = createModel
