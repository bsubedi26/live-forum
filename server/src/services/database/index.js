const user = require('./user');
const forum = require('./forum');
const comment = require('./comment');
const topic = require('./topic');

module.exports = function (app) {
  app.configure(user);
  app.configure(forum);
  app.configure(comment);
  app.configure(topic);

  app.get('/works', async (req, res) => {
    const knex = app.get('knexClient');

    const query = knex.select('*')
      .from('forum')
      .where({ topic: 'redux' })
      .innerJoin('user', 'forum.creator_id', 'user.id')
      .innerJoin('comment', 'forum.id', 'comment.forum_id');


    const data = await query;

    res.json({ success: true, data });
  });
};
