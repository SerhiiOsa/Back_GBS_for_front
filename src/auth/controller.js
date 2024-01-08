const authService = require("./service.js");
const config = require("./config.js");

const authController = {
  async login(ctx) {
    const { email, password } = ctx.request.body;
    const loginData = await authService.userLogin(email, password);

    if (loginData) {
      ctx.cookies.set(
        config.cookie.accessToken.name,
        loginData.accessToken,
        config.cookie.accessToken.options,
      );
      ctx.cookies.set(
        config.cookie.refreshToken.name,
        loginData.refreshToken,
        config.cookie.refreshToken.options,
      );
      ctx.status = 200;
      ctx.body = { message: "Authorization is successful" };
    } else {
      const error = new Error("Invalid login or password");
      error.status = 400;
      throw error;
    }
  },

  async logout(ctx) {
    const refreshToken = ctx.cookies.get(config.cookie.refreshToken.name);

    if (!refreshToken) {
      const error = new Error("Refresh token is missing");
      error.status = 401;
      throw error;
    }

    const success = await authService.userLogout(refreshToken);

    if (success) {
      ctx.status = 200;
      ctx.body = { message: "You are logged out" };
    } else {
      throw new Error("Internal server error.");
    }
  },
};

module.exports = authController;
