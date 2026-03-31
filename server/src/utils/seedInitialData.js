const logger = require('./logger')

const WAIT_MS = 100
const WAIT_TIMEOUT_MS = 10000
const SEED_COUNTS = {
  users: 10,
  topics: 25,
  threads: 60,
  comments: 100,
  followers: 20,
  rooms: 25,
  messages: 60
}

const seedUsers = [
  { email: 'admin@liveforum.dev', password: 'password123', roles: 'admin' },
  { email: 'alice@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'bob@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'carol@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'dylan@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'erin@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'farah@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'gabriel@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'henry@liveforum.dev', password: 'password123', roles: 'member' },
  { email: 'ivy@liveforum.dev', password: 'password123', roles: 'member' }
]

const seedTopics = [
  'Announcements',
  'Introductions',
  'Product Feedback',
  'Frontend',
  'Backend',
  'API Design',
  'Database',
  'DevOps',
  'Testing',
  'Accessibility',
  'Performance',
  'Security',
  'Realtime',
  'Mobile',
  'Design Systems',
  'Community',
  'Moderation',
  'Show and Tell',
  'Career Growth',
  'Open Source',
  'Documentation',
  'Tooling',
  'AI Builders',
  'Remote Work',
  'Off Topic'
]

const seedRooms = [
  'anonymous',
  'general',
  'introductions',
  'product',
  'frontend',
  'backend',
  'api',
  'database',
  'devops',
  'testing',
  'accessibility',
  'performance',
  'security',
  'realtime',
  'mobile',
  'design-system',
  'community',
  'moderation',
  'show-and-tell',
  'career',
  'open-source',
  'documentation',
  'tooling',
  'ai-builders',
  'random'
]

const threadTitleLeads = [
  'Best practices for',
  'How are teams handling',
  'Lessons learned from',
  'What would improve',
  'Current challenges with',
  'A practical guide to',
  'Patterns we keep reusing in',
  'Where should we simplify',
  'Ideas for scaling',
  'What is working well in',
  'Open discussion on',
  'Field notes about'
]

const threadSummaryLeads = [
  'Share recent wins, blockers, and patterns that feel durable.',
  'Looking for examples from real projects rather than generic advice.',
  'Would love concrete tradeoffs, screenshots, or implementation notes.',
  'Trying to gather realistic opinions before changing the current flow.',
  'This thread is for practical tactics we can test in the app this week.',
  'Curious how other teams are balancing speed, quality, and maintainability.'
]

const commentOpeners = [
  'We tried something similar last quarter and the biggest surprise was',
  'In our setup, the most reliable improvement came from',
  'I would start small here and focus first on',
  'A mistake we made early on was',
  'The part that deserves more attention is',
  'One thing users noticed immediately was',
  'What helped our team move faster was',
  'From the community side, the strongest signal has been'
]

const commentClosers = [
  'keeping the UX obvious for new members.',
  'documenting the edge cases before adding more features.',
  'measuring the baseline before calling the change a success.',
  'making moderation tools easier to reach.',
  'shipping a simple version and watching how people actually use it.',
  'cleaning up naming so the data model stays easy to reason about.',
  'protecting the happy path without over-engineering the first pass.',
  'testing the realtime flow with enough sample data to feel believable.'
]

const messageOpeners = [
  'Morning check-in:',
  'Quick note:',
  'Heads up:',
  'Sharing a small win:',
  'Question for the room:',
  'Status update:',
  'A thing worth testing:',
  'Today I noticed:'
]

const messageBodies = [
  'the latest seed content makes this space feel much closer to a real community.',
  'we should use this room to collect examples before making UI changes.',
  'the current build is stable enough to invite a round of feedback.',
  'I found a smoother way to explain the workflow to new contributors.',
  'there is still room to polish the empty states and first-run experience.',
  'more realistic sample records helped surface a couple of awkward edge cases.',
  'the conversation flow feels better when each room has its own tone and context.',
  'it would be useful to pin a short starter prompt here for newcomers.'
]

const buildSeedThreads = () => {
  return Array.from({ length: SEED_COUNTS.threads }, (_, index) => {
    const topic = seedTopics[index % seedTopics.length]
    const creator = seedUsers[index % seedUsers.length].email
    const titleLead = threadTitleLeads[index % threadTitleLeads.length]
    const summaryLead = threadSummaryLeads[index % threadSummaryLeads.length]

    return {
      title: `${titleLead} ${topic.toLowerCase()} right now?`,
      summary: `${summaryLead} We want grounded feedback on ${topic.toLowerCase()} as the forum grows. Case ${index + 1}.`,
      topic,
      creator
    }
  })
}

const buildSeedComments = threads => {
  return Array.from({ length: SEED_COUNTS.comments }, (_, index) => {
    const thread = threads[index % threads.length]
    const creator = seedUsers[(index + 2) % seedUsers.length].email
    const opener = commentOpeners[index % commentOpeners.length]
    const closer = commentClosers[index % commentClosers.length]

    return {
      thread: thread.title,
      creator,
      comment: `${opener} ${thread.topic.toLowerCase()}, especially around thread "${thread.title}". I would keep iterating on ${closer}`
    }
  })
}

const buildSeedFollowers = () => {
  const followers = []

  for (let index = 0; index < SEED_COUNTS.followers; index += 1) {
    const follower = seedUsers[index % seedUsers.length].email
    const following = seedUsers[(index + 3 + Math.floor(index / seedUsers.length)) % seedUsers.length].email
    followers.push([follower, following])
  }

  return followers
}

const buildSeedMessages = () => {
  return Array.from({ length: SEED_COUNTS.messages }, (_, index) => {
    const channel = seedRooms[(index + 1) % seedRooms.length]
    const creator = seedUsers[index % seedUsers.length].email
    const opener = messageOpeners[index % messageOpeners.length]
    const body = messageBodies[index % messageBodies.length]

    return {
      channel,
      creator,
      text: `${opener} In #${channel}, ${body}`
    }
  })
}

const seedThreads = buildSeedThreads()
const seedComments = buildSeedComments(seedThreads)
const seedFollowers = buildSeedFollowers()
const seedMessages = buildSeedMessages()

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

const clearExistingData = async app => {
  const knex = app.get('knex')

  await knex('messages').del()
  await knex('comments').del()
  await knex('users_followers').del()
  await knex('threads').del()
  await knex('topics').del()
  await knex('users').del()

  logger.info('Cleared existing seedable data before reseeding')
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
  await clearExistingData(app)

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
