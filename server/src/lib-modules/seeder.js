const faker = require('faker');

const seed = async (service, count = 50) => {
  const loopCount = [...Array(count)]
 for (var n of loopCount) {
  var title = faker.lorem.words() // make dynamic (pass as arg)
  var body = faker.lorem.sentences()
  var payload = { title, body }
  await service.create(payload)
 }
}


module.exports = seed
