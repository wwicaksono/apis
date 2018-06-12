class UserFacade {
  /**
   * Validate data before create
   * @param {*} params username-password
   */
  static async validateOnCreate(params) {
    if (params.username && params.password) {
      return {
        username: params.username,
        password: params.password,
      };
    } else if (!params.username) {
      return 'username not provided';
    }

    return 'password not provided';
  }
}

export default UserFacade;
