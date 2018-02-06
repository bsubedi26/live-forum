const faker = require('faker');
const _ = require('lodash');

const seed = async service => {
 for (var n of _.range(50)) {
  var title = faker.lorem.words()
  var body = faker.lorem.sentences()
  var payload = { title, body }
  await service.create(payload)
 }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
