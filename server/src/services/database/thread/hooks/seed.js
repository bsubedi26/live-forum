const faker = require('faker')

const seed = async service => {
  const topics = []
  for (var i = 1; i < 17; i++) {
    topics.push(i)
  }

  for (i of topics) {
    var title = faker.lorem.words()
    var summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 1, creator_id: i }
    await service.create(payload)
  }

  for (i of topics) {
    var title = faker.lorem.words()
    var summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 2, creator_id: i }
    await service.create(payload)
  }

  for (i of topics) {
    var title = faker.lorem.words()
    var summary = faker.lorem.sentences()
    const payload = { title, summary, topic_id: 3, creator_id: i }
    await service.create(payload)
  }

}

module.exports = seed;