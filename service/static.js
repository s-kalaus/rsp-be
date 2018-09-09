/* global Promise */

const BaseService = require('./base');

class StaticService extends BaseService {

  constructor(app) {

    super(app);

    this.games = {
      rsp: require('../static/rsp')
    };
  }

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
};

module.exports = StaticService;
