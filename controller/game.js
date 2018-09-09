const BaseController = require('./base');

/*
 * Game Controller
 */
class GameController extends BaseController {

  /*
   * Add Game
   *
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  addGame(req, res) {

    this.app.apiResponse(res, this.app.gameService.addGame({
      gameName: req.body.gameName,
      gameType: req.body.gameType
    }));
  }

  /*
   * Add Round
   *
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  addRound(req, res) {

    this.app.apiResponse(res, this.app.gameService.addRound({
      gameId: req.params.gameId,
      choice: req.body.choice
    }));
  }

  /*
   * Init controller
   */
  init() {

    this.app.server.post(this.app.config.apiPath + '/game', (req, res) =>
      this.app.checkAuth(req, res).then(() =>
        this.addGame(req, res)));

    this.app.server.post(this.app.config.apiPath + '/game/:gameId/round', (req, res) =>
      this.app.checkAuth(req, res).then(() =>
        this.addRound(req, res)));
  }
}

module.exports = GameController;
