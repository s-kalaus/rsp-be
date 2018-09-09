const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;

chai.use(spies);

const GameService = require('./game');

describe('GameService', function() {
  let app;
  let inst;

  beforeEach(function () {
    app = {
      staticService: {
        games: {
          rsp: require('../static/rsp')
        }
      },
      logger: {
        info: chai.spy(() => {}),
        error: chai.spy(() => {})
      }
    };
    inst = new GameService(app);
  });

  it('should exist and have default', function() {
    expect(inst).to.be.a('object');
    expect(inst.app).to.equal(app);
    expect(inst.gameId).to.equal(1);
    expect(inst.roundId).to.equal(1);
    expect(inst.games).to.eql({});
    expect(Object.keys(inst.ais)).to.eql(['random']);
  });

  describe('Function: addGame', function() {
    it('should exist', function() {
      expect(inst.addGame).to.be.a('function');
    });
    it('should return promise', function() {
      expect(inst.addGame({gameType: 'pvc', gameName: 'rsp'})).to.be.a('promise');
    });
    it('should resolve game', function() {
      inst.addGame({gameType: 'pvc', gameName: 'rsp'}).then((game) =>
        expect(game).to.eql({
          gameId: 1,
          gameType: 'pvc',
          gameName: 'rsp',
          rounds: []
        }));
    });
  });

  describe('Function: addRound', function() {
    beforeEach(function () {
      inst.games[1] = {gameName: 'rsp', rounds: []};
    });
    it('should exist', function() {
      expect(inst.addRound).to.be.a('function');
    });
    it('should return promise', function() {
      expect(inst.addRound({gameId: 1, choice: 1})).to.be.a('promise');
    });
    it('should resolve round', function() {
      inst.addRound({gameId: 1, choice: 1}).then((round) =>
        expect(round.roundId).to.equal(1));
    });
    it('should react on error', function() {
      inst.addRound({gameId: 2}).catch((err) =>
        expect(err.message).to.equal('Game Not Found: 2'));
    });
  });

  describe('Function: makeDecision', function() {
    it('should exist', function() {
      expect(inst.makeDecision).to.be.a('function');
    });
    it('should return choice if we are in pvc mode', function() {
      expect(inst.makeDecision({gameId: 1, gameName: 'rsp', gameType: 'pvc'}, {}, 1, 1)).to.equal(1);
    });
    it('should call makeDecision', function() {
      chai.spy.on(inst.ais.random, 'makeDecision');
      inst.makeDecision({gameId: 1, gameName: 'rsp'}, {}, 1);
      expect(inst.ais.random.makeDecision).to.have.been.called.with({gameId: 1, gameName: 'rsp'}, {}, 1);
    });
    it('should return proper decision', function() {
      chai.spy.on(inst.ais.random, 'makeDecision', function () { return 1; });
      expect(inst.makeDecision({gameId: 1, gameName: 'rsp'}, {}, 1)).to.equal(1);
    });
  });

  describe('Function: getWinner', function() {
    it('should exist', function() {
      expect(inst.getWinner).to.be.a('function');
    });
    it('should return winner for 0-0', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 0, partyChoice1: 0})).to.equal(null);
    });
    it('should return winner for 0-1', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 0, partyChoice1: 1})).to.equal(0);
    });
    it('should return winner for 0-2', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 0, partyChoice1: 2})).to.equal(1);
    });
    it('should return winner for 1-1', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 1, partyChoice1: 1})).to.equal(null);
    });
    it('should return winner for 1-0', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 1, partyChoice1: 0})).to.equal(1);
    });
    it('should return winner for 1-2', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 1, partyChoice1: 2})).to.equal(0);
    });
    it('should return winner for 2-2', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 2, partyChoice1: 2})).to.equal(null);
    });
    it('should return winner for 2-0', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 2, partyChoice1: 0})).to.equal(0);
    });
    it('should return winner for 2-1', function() {
      expect(inst.getWinner({gameId: 1, gameName: 'rsp'}, {partyChoice0: 2, partyChoice1: 1})).to.equal(1);
    });
  });
});