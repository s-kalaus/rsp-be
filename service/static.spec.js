const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

const rsp = require('../static/rsp');
const StaticService = require('./static');

describe('StaticService', function() {
  let app;
  let inst;

  beforeEach(function () {
    app = {
      logger: {
        info: chai.spy(() => {}),
        error: chai.spy(() => {})
      }
    };
    inst = new StaticService(app);
  });

  it('should exist and have default', function() {
    expect(inst).to.be.a('object');
    expect(inst.app).to.equal(app);
    expect(inst.games).to.eql({rsp});
  });

  describe('Function: getGameSchema', function() {
    it('should exist', function() {
      expect(inst.getGameSchema).to.be.a('function');
    });
    it('should return promise', function() {
      expect(inst.getGameSchema({gameName: 'rsp'})).to.be.a('promise');
    });
    it('should resolve schema', function() {
      inst.getGameSchema({gameName: 'rsp'}).then((schema) =>
        expect(schema).to.eql(rsp));
    });
    it('should react on error', function() {
      inst.getGameSchema({gameName: 'test'}).catch((err) =>
        expect(err.message).to.equal('Game Schema Not Found: test'));
    });
  });
});