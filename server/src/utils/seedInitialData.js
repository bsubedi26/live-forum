const logger = require('./logger')

const WAIT_MS = 100
const WAIT_TIMEOUT_MS = 10000

const seedUsers = [
  { email: 'admin@liveforum.dev', password: 'password123', roles: 'admin' },
  { email: 'alice@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'bob@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'carol@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'dylan@liveforum.dev', password: 'password123', roles: 'member' }
]

const seedTopics = [
  'Announcements',
  'Frontend',
  'Backend',
  'DevOps'
]

const seedThreads = [
  {
    title: 'Welcome to Live Forum',
    summary: 'Introduce yourself, share what you are building, and say what you want from the community.',
    topic: 'Announcements',
    creator: 'admin@liveforum.dev'
  },
  {
    title: 'React patterns the client already uses',
    summary: 'A quick thread for discussing the current component structure, global state patterns, and where to simplify.',
    topic: 'Frontend',
    creator: 'alice@liveforum.dev'
  },
  {
    title: 'Feathers services worth expanding',
    summary: 'Let us collect ideas for useful hooks, joins, and query patterns that would make the forum feel richer.',
    topic: 'Backend',
    creator: 'bob@liveforum.dev'
  },
  {
    title: 'Docker workflow for local development',
    summary: 'Share notes on getting the stack running consistently and what should be improved in the local setup.',
    topic: 'DevOps',
    creator: 'carol@liveforum.dev'
  },
  {
    title: 'What should the homepage highlight?',
    summary: 'Gather ideas for a better first impression and which features should be easiest to discover.',
    topic: 'Announcements',
    creator: 'dylan@liveforum.dev'
  },
  {
    title: 'Thread and comment UX wishlist',
    summary: 'Talk about pagination, editing, moderation, and little quality-of-life improvements that would help.',
    topic: 'Frontend',
    creator: 'admin@liveforum.dev'
  }
]

const seedComments = [
  {
    thread: 'Welcome to Live Forum',
    creator: 'alice@liveforum.dev',
    comment: 'I am using this project to learn Feathers and realtime updates. Happy to be here.'
  },
  {
    thread: 'Welcome to Live Forum',
    creator: 'bob@liveforum.dev',
    comment: 'Looking forward to testing the thread, comment, and follower flows with realistic sample data.'
  },
  {
    thread: 'React patterns the client already uses',
    creator: 'carol@liveforum.dev',
    comment: 'The global state helpers make the app easy to follow, but a few screens could use clearer loading states.'
  },
  {
    thread: 'Feathers services worth expanding',
    creator: 'dylan@liveforum.dev',
    comment: 'A notifications service and better topic statistics would be a nice next step.'
  },
  {
    thread: 'Docker workflow for local development',
    creator: 'admin@liveforum.dev',
    comment: 'Getting a predictable local database path solved most of the friction for me.'
  },
  {
    thread: 'Thread and comment UX wishlist',
    creator: 'alice@liveforum.dev',
    comment: 'Inline comment submission feels good already. Surfacing author info more clearly would help too.'
  }
]

const seedFollowers = [
  ['alice@liveforum.dev', 'admin@liveforum.dev'],
  ['bob@liveforum.dev', 'alice@liveforum.dev'],
  ['carol@liveforum.dev', 'bob@liveforum.dev'],
  ['dylan@liveforum.dev', 'alice@liveforum.dev'],
  ['admin@liveforum.dev', 'carol@liveforum.dev']
]

const seedRooms = ['anonymous', 'general', 'frontend', 'backend', 'devops', 'random']

const seedMessages = [
  {
    channel: 'general',
    creator: 'admin@liveforum.dev',
    text: 'Welcome to the general room. Use this space for broad project conversation.'
  },
  {
    channel: 'frontend',
    creator: 'alice@liveforum.dev',
    text: 'The thread list is already pretty usable. Seed data should make it easier to polish the experience.'
  },
  {
    channel: 'backend',
    creator: 'bob@liveforum.dev',
    text: 'Feathers hooks are doing a lot of nice work here. More sample records will help us validate the joins.'
  },
  {
    channel: 'devops',
    creator: 'carol@liveforum.dev',
    text: 'Once local setup feels effortless, onboarding gets much easier.'
  },
  {
    channel: 'random',
    creator: 'dylan@liveforum.dev',
    text: 'This is the room for off-topic ideas, experiments, and quick check-ins.'
  }
]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const waitForTables = async (knex, tables) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < WAIT_TIMEOUT_MS) {
    const checks = await Promise.all(tables.map(table => knex.schema.hasTable(table)))

    if (checks.every(Boolean)) return
    await sleep(WAIT_MS)
  }

  throw new Error(`Timed out waiting for tables: ${tables.join(', ')}`)
}

const getCount = async (knex, table) => {
  const result = await knex(table).count({ count: '*' }).first()
  return Number(result.count || 0)
}

const getLookupMap = (items, key) => {
  return items.reduce((acc, item) => {
    acc[item[key]] = item
    return acc
  }, {})
}

const setSeedRooms = app => {
  const currentRooms = Array.isArray(app.channels) ? app.channels : []
  app.channels = Array.from(new Set(currentRooms.concat(seedRooms)))
}

const ensureUsers = async app => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'users')

  if (!existingCount) {
    const usersService = app.service('users')

    for (const user of seedUsers) {
      await usersService.create(user)
    }

    logger.info('Seeded users table with %d records', seedUsers.length)
  }

  return knex('users').select('id', 'email', 'roles')
}

const ensureTopics = async app => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'topics')

  if (!existingCount) {
    const payload = seedTopics.map(name => ({ name }))
    await knex('topics').insert(payload)
    logger.info('Seeded topics table with %d records', payload.length)
  }

  return knex('topics').select('id', 'name')
}

const ensureThreads = async (app, userMap, topicMap) => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'threads')

  if (!existingCount) {
    const fallbackUserId = Object.values(userMap)[0] && Object.values(userMap)[0].id
    const fallbackTopicId = Object.values(topicMap)[0] && Object.values(topicMap)[0].id
    const payload = seedThreads.map(thread => ({
      title: thread.title,
      summary: thread.summary,
      creator_id: (userMap[thread.creator] || {}).id || fallbackUserId,
      topic_id: (topicMap[thread.topic] || {}).id || fallbackTopicId
    }))

    await knex('threads').insert(payload)
    logger.info('Seeded threads table with %d records', payload.length)
  }

  return knex('threads').select('id', 'title', 'topic_id', 'creator_id')
}

const ensureComments = async (app, userMap, threadMap) => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'comments')

  if (!existingCount) {
    const fallbackUserId = Object.values(userMap)[0] && Object.values(userMap)[0].id
    const fallbackThreadId = Object.values(threadMap)[0] && Object.values(threadMap)[0].id
    const payload = seedComments.map(comment => ({
      comment: comment.comment,
      creator_id: (userMap[comment.creator] || {}).id || fallbackUserId,
      thread_id: (threadMap[comment.thread] || {}).id || fallbackThreadId
    }))

    await knex('comments').insert(payload)
    logger.info('Seeded comments table with %d records', payload.length)
  }
}

const ensureFollowers = async (app, userMap) => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'users_followers')

  if (!existingCount) {
    const payload = seedFollowers
      .map(([followerEmail, followingEmail]) => ({
        follower_id: (userMap[followerEmail] || {}).id,
        following_id: (userMap[followingEmail] || {}).id
      }))
      .filter(row => row.follower_id && row.following_id && row.follower_id !== row.following_id)

    if (payload.length) {
      await knex('users_followers').insert(payload)
      logger.info('Seeded users_followers table with %d records', payload.length)
    }
  }
}

const ensureMessages = async (app, userMap) => {
  const knex = app.get('knex')
  const existingCount = await getCount(knex, 'messages')

  if (!existingCount) {
    const fallbackUserId = Object.values(userMap)[0] && Object.values(userMap)[0].id
    const payload = seedMessages.map(message => ({
      text: message.text,
      channel: message.channel,
      creator_id: (userMap[message.creator] || {}).id || fallbackUserId
    }))

    await knex('messages').insert(payload)
    logger.info('Seeded messages table with %d records', payload.length)
  }
}

const seedInitialData = async app => {
  const knex = app.get('knex')

  await waitForTables(knex, ['users', 'topics', 'threads', 'comments', 'users_followers', 'messages'])
  setSeedRooms(app)

  const users = await ensureUsers(app)
  const topics = await ensureTopics(app)

  const userMap = getLookupMap(users, 'email')
  const topicMap = getLookupMap(topics, 'name')

  const threads = await ensureThreads(app, userMap, topicMap)
  const threadMap = getLookupMap(threads, 'title')

  await ensureComments(app, userMap, threadMap)
  await ensureFollowers(app, userMap)
  await ensureMessages(app, userMap)
}

module.exports = seedInitialData
