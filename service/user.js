const BaseService = require('./base');

/**
 * User Service
 */
class UserService extends BaseService {

  /**
   * Constructor
   *
   * @param {Object} app Application reference
   */
  constructor(app) {

    super(app);

    this.users = {};
  }

  /**
   * Add new user
   *
   * @param {Object} params User data
   */
  addUser(params) {

    const username = String(params.username || '').replace(/[<>$"']/g, '').slice(0, 20) || 'Noname';

    return new Promise((resolve) => {

      this.app.logger.info('User added', username);

      const user = {
        sessionId: Math.floor(Math.random() * new Date().getTime()),
        username
      };

      this.users[user.sessionId] = user;

      resolve(user);
    });
  }
}

module.exports = UserService;
