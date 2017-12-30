'use strict';

// const { authenticate } = require('feathers-authentication').hooks;
// const { populate } = require('feathers-hooks-common');
// const processMessage = require('../../hooks/process-message');

const populateTopicIds = () => async hook => {
  const forumService = hook.app.service('forum');
  const topicService = hook.app.service('topic');

  const forums = await forumService.find();
  const topics = await topicService.find();

  topics.data.forEach(topic => {
    forums.data.forEach(forum => {
      if (topic.name.toLowerCase() === forum.topic) {
        forumService.patch(forum.id, { topic_id: topic.id });
      }
    });
  });

  return hook;
};

module.exports = {
  before: {
    all: [
      // authenticate('jwt')
    ],
    find: [
      // populateTopicIds()
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // populate({
      //   schema: {
      //     include: [{
      //       service: 'users',
      //       nameAs: 'user',
      //       parentField: 'userId',
      //       childField: '_id'
      //     }]
      //   }
      // })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
