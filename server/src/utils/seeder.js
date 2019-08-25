const faker = require('faker')

const seed = async (service, count = 50) => {
  const loopCount = [...Array(count)]
  for (const n of loopCount) {
    console.log('n: ', n)
    const title = faker.lorem.words() // make dynamic (pass as arg)
    const body = faker.lorem.sentences()
    const payload = { title, body }
    await service.create(payload)
  }
}

module.exports = seed
