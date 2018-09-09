const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

const UserService = require('./user');

describe('UserService', function() {
  let app;
  let inst;

  beforeEach(function () {
    app = {
      logger: {
        info: chai.spy(() => {})
      }
    };
    inst = new UserService(app);
  });

  it('should exist and have default', function() {
    expect(inst).to.be.a('object');
    expect(inst.app).to.equal(app);
    expect(inst.users).to.eql({});
  });

  describe('Function: addUser', function() {
    it('should exist', function() {
      expect(inst.addUser).to.be.a('function');
    });
    it('should return promise', function() {
      expect(inst.addUser({})).to.be.a('promise');
    });
    it('should resolve user', function() {
      inst.addUser({username: 'test'}).then((user) =>
        expect(user.username).to.equal('test'));
    });
    it('should fix username', function() {
      inst.addUser({username: '<te>st$'}).then((user) =>
        expect(user.username).to.equal('test'));
    });
    it('should fix empty username', function() {
      inst.addUser({username: ''}).then((user) =>
        expect(user.username).to.equal('Noname'));
    });
  });
});