const { Model } = require('objection')

const TABLE_NAME = 'users'

class User extends Model {
  static get tableName () {
    return TABLE_NAME
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['password'],

      properties: {

        email: { type: ['string', 'null'] },
        password: 'string'

      }
    }
  }

  $beforeInsert () {
    this.created_at = this.updated_at = new Date()
  }

  $beforeUpdate () {
    this.updated_at = new Date()
  }
}

module.exports = function (app) {
  const knex = app.get('knex')
  // const alterTable = () => knex.schema.table(TABLE_NAME, table => {
  // })
  //   .then(() => console.error(`Altered ${TABLE_NAME} table`))
  //   .catch(e => console.error(`Error Altering ${TABLE_NAME} table`, e))

  knex.schema.hasTable(TABLE_NAME).then(exists => {
    // if (exists) return alterTable()

    if (!exists) {
      knex.schema.createTable(TABLE_NAME, table => {
        table.increments('id')

        table.string('email').unique()
        table.string('password')

        table.string('avatar')
        table.integer('login_attempts').defaultTo(4)
        table.boolean('active').defaultTo(true)

        table.timestamp('created_at')
        table.timestamp('updated_at')
      })
        .then(() => console.log(`Created ${TABLE_NAME} table`))
        .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))
    }
  })
    .catch(e => console.error(`Error creating ${TABLE_NAME} table`, e))

  return User
}
