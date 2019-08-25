const faker = require('faker')

const seed = async service => {
  const topics = []
  for (let i = 1; i < 17; i++) {
    topics.push(i)
  }

  for (const i of topics) {
    const title = faker.lorem.words()
    const summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 1, creator_id: i }
    await service.create(payload)
  }

  for (const i of topics) {
    const title = faker.lorem.words()
    const summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 2, creator_id: i }
    await service.create(payload)
  }

  for (const i of topics) {
    const title = faker.lorem.words()
    const summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 3, creator_id: i }
    await service.create(payload)
  }
}

module.exports = seed
