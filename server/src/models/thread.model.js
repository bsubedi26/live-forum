
module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'threads';

  db.schema.hasTable(table).then(exists => {

    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('title').notNullable();
        t.string('summary').notNullable();

        t.integer('topic_id').unsigned().references('id').inTable('topics');
        t.integer('creator_id').unsigned().references('id').inTable('users');
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
