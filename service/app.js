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

/**
 * App Service
 */
class AppService {

  /**
   * Main init method
   */
  init() {

    this.initConfig();
    this.initLogger();
    this.initServer();
    this.initService();
  }

  /**
   * Initialize config
   */
  initConfig() {

    this.env = process.env.NODE_ENV || 'production';

    this.config = require('../config/' + this.env);
  }

  /**
   * Initialize logger
   */
  initLogger() {

    this.logger = new LoggerService(this);
  }

  /**
   * Initialize server
   */
  initServer() {

    this.server = express();

    this.server.use(cors());
    this.server.use(bodyParser.json());

    this.initRouting();

    this.server.listen(this.config.port, () =>
      this.logger.info('Listening on port 3000'));
  }

  /**
   * Initialize routing
   */
  initRouting() {

    new StaticController(this).init();
    new UserController(this).init();
    new GameController(this).init();
  }

  /**
   * Initialize services
   */
  initService() {

    this.gameService = new GameService(this);
    this.userService = new UserService(this);
    this.staticService = new StaticService(this);
  }

  /**
   * Auth middleware
   *
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   *
   * @returns {Promise}
   */
  checkAuth(req, res) {

    return new Promise((resolve) => {

      const session = req.headers.authorization;

      if (!session || !this.userService.users[session]) {

        const err = new Error('User Not Found: ' + session);

        this.logger.error(err);

        return this.apiError(res, err);
      }

      resolve();
    });
  }

  /**
   * Main response handler
   *
   * @param {Object} res Express response object
   * @param {Object} promise response promise
   */
  apiResponse(res, promise) {

    promise
      .then((result) => this.apiSuccess(res, result))
      .catch((err) => this.apiError(res, err));
  }

  /**
   * On success response handler
   *
   * @param {Object} res Express response object
   * @param {Object} result Api result response
   */
  apiSuccess(res, result) {

    res.json({
      success: true,
      data: result
    });
  }

  /**
   * On error response handler
   *
   * @param {Object} res Express response object
   * @param {Error} err Error object
   */
  apiError(res, err) {

    res.status(500).json({
      success: false,
      message: this.config.apiExposeError ? err.message : 'API Error'
    });
  }
}

module.exports = AppService;
