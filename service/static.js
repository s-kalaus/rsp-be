/** global Promise */

const BaseService = require('./base');

/**
 * Static Service
 */
class StaticService extends BaseService {

  /**
   * Constructor
   *
   * @param {Object} app Application reference
   */
  constructor(app) {

    super(app);

    this.games = {
      rsp: require('../static/rsp')
    };
  }

  /**
   * Get game schema
   *
   * @param {Object} params Request params
   */
  getGameSchema(params) {

    const gameName = params.gameName;

    return new Promise((resolve, reject) => {

      if (!this.games[gameName]) {

        const err = new Error('Game Schema Not Found: ' + gameName);

        this.app.logger.error(err);

        return reject(err);
      }

      this.app.logger.info('Schema fetched', gameName);

      resolve(this.games[gameName]);
    });
  }
}

module.exports = StaticService;
