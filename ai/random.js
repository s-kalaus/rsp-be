const BaseAi = require('./base');

class RandomAi extends BaseAi {

  makeDecision(game, round, party) {

    const gameSchema = this.app.staticService.games[game.gameName];

    return Math.floor(Math.random() * gameSchema.objects.length);
  }
};

module.exports = RandomAi;
