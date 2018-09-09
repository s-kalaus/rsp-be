/*
 * Base class for controllers
 */
class BaseController {

  /*
   * Constructor
   *
   * @param {Object} app Application reference
   */
  constructor(app) {

    this.app = app;
  }
}

module.exports = BaseController;
