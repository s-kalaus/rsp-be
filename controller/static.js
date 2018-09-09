const BaseController = require('./base');

/*
 * Static Controller
 */
class StaticController extends BaseController {

  /*
   * Get gmae schema
   *
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  getGameSchema(req, res) {

    this.app.apiResponse(res, this.app.staticService.getGameSchema({
      gameName: req.params.gameName
    }));
  }

  /*
   * Init controller
   */
  init() {

    this.app.server.get(this.app.config.apiPath + '/static/:gameName', (req, res) =>
      this.getGameSchema(req, res));
  }
}

module.exports = StaticController;
