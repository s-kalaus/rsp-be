const BaseService = require('./base');

/**
 * Logger class
 */
class LoggerService extends BaseService {

  /**
   * Info message
   */
  info() {

    if (!this.app.config.logToConsole.info) {
      return;
    }

    const params = Array.from(arguments);

    params.unshift(new Date().toISOString());

    // eslint-disable-next-line no-console
    console.log.apply(null, params);
  }

  /**
   * Error message
   *
   * @param {Error} err Error object
   */
  error(err) {

    if (!this.app.config.logToConsole.error) {
      return;
    }

    // eslint-disable-next-line no-console
    console.error(new Date().toISOString(), err);
  }
}

module.exports = LoggerService;
