const assert = require('assert');
const app = require('../../src/app');
const { expect } = require('chai');
const errors = require('@feathersjs/errors');

describe('\'users\' service', () => {
  let userService;

  beforeEach(() => {
    userService = app.service('users');

  });
  it('registered the service', () => {
    assert.ok(userService, 'Registered the service');
  });

  it('create', (done) => {
    userService.create({ email: 'uniqueUser', password: 'uniquePass' })
      .then(res => {
        expect(res).to.be.ok;
        done();
      })
      .catch(error => {
        expect(error instanceof errors.FeathersError).to.be.ok;
        done();
      });
  });

  it('create only unique user', (done) => {
    const random = (Math.random(1) * 1000000000000).toFixed(0);

    userService.create({ email: random, password: random })
      .then(() => {
        userService.create({ email: random, password: random })
          .then(() => {})
          .catch(error => {
            expect(error instanceof errors.FeathersError).to.be.ok;
            expect(error.message).to.equal('The provided email already exists. Try again.');
            done();
          });
      });
    
  });


});
