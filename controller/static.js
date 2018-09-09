const BaseController = require('./base');

class StaticController extends BaseController {

  getGameSchema(req, res) {

    this.app.apiResponse(res, this.app.staticService.getGameSchema({
      gameName: req.params.gameName
    }));
  }

  init() {

    this.app.server.get(this.app.config.apiPath + '/static/:gameName', (req, res) =>
      this.getGameSchema(req, res));
  }
};

module.exports = StaticController;
