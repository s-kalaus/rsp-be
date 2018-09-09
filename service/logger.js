const BaseService = require('./base');

class LoggerService extends BaseService {

  info(message) {

    if (!this.app.config.logToConsole.info) {
      return;
    }

    const params = Array.from(arguments);

    params.unshift(new Date().toISOString());

    console.log.apply(null, params);
  }

  error(err) {

    if (!this.app.config.logToConsole.error) {
      return;
    }

    console.error(new Date().toISOString(), err);
  }
};

module.exports = LoggerService;
