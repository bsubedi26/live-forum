module.exports = function (app) {
  const knex = app.get('knexClient');
  const table = 'users';
  
  knex.schema.hasTable(table).then(exists => {

    if (!exists) {
      knex.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('email').unique().notNullable();
        t.string('password').notNullable();
        t.string('avatar').notNullable();
        
        t.timestamps(true, true);
      })
        .then(() => console.log(`Created ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return knex;
};