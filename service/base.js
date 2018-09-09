/**
 * Base class for services
 */
class BaseService {

  /**
   * Constructor
   *
   * @param {Object} app Application reference
   */
  constructor(app) {

    this.app = app;
  }
}

module.exports = BaseService;
