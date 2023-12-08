const authService = require("./service.js");
const config = require("./config.js");

const authController = {
  async login(ctx) {
    const { email, password } = ctx.request.body;
    const loginData = await authService.userLogin(email, password);

    if (loginData) {
      ctx.cookies.set(
        config.cookie.name,
        loginData.refreshToken,
        config.cookie.options,
      );

      ctx.status = 200;
      ctx.body = {
        message: "Authorization is successful",
        accessToken: loginData.accessToken,
      };
    } else {
      const error = new Error("Invalid login or password");
      error.status = 401;
      throw error;
    }
  },

  async refreshAccessToken(ctx) {
    const refreshToken = ctx.cookies.get(config.cookie.name);

    if (!refreshToken) {
      const error = new Error("Refresh token is missing");
      error.status = 401;
      throw error;
    }

    const refreshAccessTokenData =
      await authService.refreshAccessToken(refreshToken);

    if (refreshAccessTokenData) {
      ctx.cookies.set(
        config.cookie.name,
        refreshAccessTokenData.newRefreshToken,
        config.cookie.options,
      );

      ctx.status = 200;
      ctx.body = {
        accessToken: refreshAccessTokenData.newAccessToken,
      };
    } else {
      const error = new Error("Invalid or expired refresh token");
      error.status = 401;
      throw error;
    }
  },

  async logout(ctx) {
    const refreshToken = ctx.cookies.get(config.cookie.name);

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
