const BaseController = require('./base');

class GameController extends BaseController {

  addGame(req, res) {

    this.app.apiResponse(res, this.app.gameService.addGame({
      gameName: req.body.gameName,
      gameType: req.body.gameType
    }));
  }

  addRound(req, res) {

    this.app.apiResponse(res, this.app.gameService.addRound({
      gameId: req.params.gameId,
      choice: req.body.choice
    }));
  }

  init() {

    this.app.server.post(this.app.config.apiPath + '/game', (req, res) =>
      this.app.checkAuth(req, res).then(() =>
      this.addGame(req, res)));

    this.app.server.post(this.app.config.apiPath + '/game/:gameId/round', (req, res) =>
      this.app.checkAuth(req, res).then(() =>
      this.addRound(req, res)));
  }
};

module.exports = GameController;
