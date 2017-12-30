module.exports = function (app) {
  const db = app.get('knexClient');
  const table = 'comment';

  db.schema.hasTable(table).then(exists => {

    if (!exists) {
      db.schema.createTable(table, t => {
        t.increments('id').primary();
        t.string('comment').notNullable();
        
        t.integer('forum_id').unsigned().references('id').inTable('forum');
        t.integer('creator_id').unsigned().references('id').inTable('user');
        t.string('creator_email').notNullable();
        t.timestamps(true, true);

      })
        .then(() => console.log(`Updated ${table} table`))
        .catch((e) => console.log(e));
    }
  });

  return db;
};
