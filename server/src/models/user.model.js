module.exports = function (app) {
  const knex = app.get('knexClient');
  const table = 'users';

  // initial schema
  knex.schema.hasTable(table).then(exists => {
    if (!exists) {
      knex.schema.createTable(table, table => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('avatar').notNullable();

        table.integer('login_attempts').defaultTo(4);
        table.boolean('active').defaultTo(true);
        table.timestamps(true, true);
      })
        .then(() => console.log(`Created ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return knex;
};