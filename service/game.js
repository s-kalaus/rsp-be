const BaseService = require('./base');
const RandomAi = require('../ai/random');

class GameService extends BaseService {

  constructor(app) {

    super(app);

    this.gameId = 1;
    this.roundId = 1;

    this.games = {};

    this.ais = {
      random: new RandomAi(app)
    };
  }

  addGame(params) {

    const gameType = params.gameType;
    const gameName = params.gameName;

    return new Promise((resolve) => {

      const game = {
        gameId: this.gameId++,
        gameType,
        gameName,
        rounds: []
      };

      this.games[game.gameId] = game;

      this.app.logger.info('Game added', game.gameId);

      resolve(game);
    });
  }

  addRound(params) {

    const gameId = params.gameId;
    const choice = params.choice;

    return new Promise((resolve, reject) => {

      const game = this.games[gameId];

      if (!game) {

        const err = new Error('Game Not Found: ' + gameId);

        this.app.logger.error(err);

        return reject(err);
      }

      const round = {
        roundId: this.roundId++
      };

      round.partyChoice0 = this.makeDecision(game, round, 0, choice);
      round.partyChoice1 = this.makeDecision(game, round, 1);
      round.winner = this.getWinner(game, round);

      game.rounds.push(round);

      game.rounds.splice(0, game.rounds.length - 5);

      this.app.logger.info('Round added', game.gameId, round.roundId);

      resolve(round);
    });
  }

  makeDecision(game, round, party, choice) {

    if (choice !== undefined && game.gameType === 'pvc') {
      return choice;
    }

    const gameSchema = this.app.staticService.games[game.gameName];

    const decision = this.ais[gameSchema.ai[party]].makeDecision(game, round, party);

    this.app.logger.info('Decision made', game.gameId, round.roundId, party, decision);

    return decision;
  }

  getWinner(game, round) {

    const gameSchema = this.app.staticService.games[game.gameName];
    let winner = null;

    if (gameSchema.objects[round.partyChoice0].win.indexOf(round.partyChoice1) !== -1) {
      winner = 0;
    } else if (gameSchema.objects[round.partyChoice1].win.indexOf(round.partyChoice0) !== -1) {
      winner = 1;
    }

    this.app.logger.info('Winner determined', game.gameId, round.roundId, winner);

    return winner;
  }
};

module.exports = GameService;
