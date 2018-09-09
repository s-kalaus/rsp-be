const BaseController = require('./base');

/*
 * User Controller
 */
class UserController extends BaseController {

  /*
   * Add User
   *
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  addUser(req, res) {

    this.app.apiResponse(res, this.app.userService.addUser({
      username: req.body.username
    }));
  }

  /*
   * Init controller
   */
  init() {

    this.app.server.post(this.app.config.apiPath + '/user', (req, res) =>
      this.addUser(req, res));
  }
}

module.exports = UserController;
