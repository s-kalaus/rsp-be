const BaseController = require('./base');

class UserController extends BaseController {

  addUser(req, res) {

    this.app.apiResponse(res, this.app.userService.addUser({
      username: req.body.username
    }));
  }

  init() {

    this.app.server.post(this.app.config.apiPath + '/user', (req, res) =>
      this.addUser(req, res));
  }
};

module.exports = UserController;
