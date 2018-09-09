const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const LoggerService = require('./logger');
const StaticController = require('../controller/static');
const UserController = require('../controller/user');
const GameController = require('../controller/game');
const GameService = require('./game');
const UserService = require('./user');
const StaticService = require('./static');

class AppService {

  init() {

    this.initConfig();
    this.initLogger();
    this.initServer();
    this.initService();
  }

  initConfig() {

    this.env = process.env.NODE_ENV || 'production';

    this.config = require('../config/' + this.env);
  }

  initLogger() {

    this.logger = new LoggerService(this);
  }

  initServer() {

    this.server = express();

    this.server.use(cors());
    this.server.use(bodyParser.json());

    this.initRouting();

    this.server.listen(this.config.port, () =>
      this.logger.info('Listening on port 3000'));
  }

  initRouting() {

    new StaticController(this).init();
    new UserController(this).init();
    new GameController(this).init();
  }

  initService() {

    this.gameService = new GameService(this);
    this.userService = new UserService(this);
    this.staticService = new StaticService(this);
  }

  checkAuth(req, res) {

    return new Promise((resolve) => {

      const session = req.headers.authorization;

      if (!session || !this.userService.users[session]) {

        const err = new Error('User Not Found: ' + session)

        this.logger.error(err);

        return this.apiError(res, err);
      }

      resolve();
    });
  }

  apiResponse(res, promise) {

    promise
      .then((result) => this.apiSuccess(res, result))
      .catch((err) => this.apiError(res, err));
  }

  apiSuccess(res, result) {

    res.json({
      success: true,
      data: result
    });
  }

  apiError(res, err) {

    res.status(500).json({
      success: false,
      message: this.config.apiExposeError ? err.message : 'API Error'
    });
  }
};

module.exports = AppService;
