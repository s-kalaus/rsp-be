const BaseAi = require('./base');

/*
 * Random Ai
 *
 * @param {Object} app Application reference
 */
class RandomAi extends BaseAi {

  /*
   * Make decision
   *
   * @param {Object} game Game object
   * @param {Object} round Round object
   * @param {Object} party Party index
   */
  makeDecision(game/*, round, party*/) {

    const gameSchema = this.app.staticService.games[game.gameName];

    return Math.floor(Math.random() * gameSchema.objects.length);
  }
}

module.exports = RandomAi;
