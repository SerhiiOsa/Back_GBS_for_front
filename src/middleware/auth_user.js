const jwt = require("jsonwebtoken");
const config = require("../auth/config");
const authService = require("../auth/service");

module.exports = async (ctx, next) => {
  const accessToken = ctx.cookies.get(config.cookie.accessToken.name);

  if (!accessToken) {
    await refreshAccessToken(ctx, next);
  } else {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (decoded) {
      await next();
    } else {
      const error = new Error("Token is not valid");
      error.status = 401;
      throw error;
    }
  }
};

async function refreshAccessToken(ctx, next) {
  const refreshToken = ctx.cookies.get(config.cookie.refreshToken.name);
  if (!refreshToken) {
    const error = new Error("Refresh token is missing");
    error.status = 401;
    throw error;
  }

  const refreshAccessTokenData =
    await authService.refreshAccessToken(refreshToken);

  if (refreshAccessTokenData) {
    ctx.cookies.set(
      config.cookie.accessToken.name,
      refreshAccessTokenData.newAccessToken,
      config.cookie.accessToken.options,
    );
    ctx.cookies.set(
      config.cookie.refreshToken.name,
      refreshAccessTokenData.newRefreshToken,
      config.cookie.refreshToken.options,
    );

    await next();
  } else {
    const error = new Error("Invalid or expired refresh token");
    error.status = 401;
    throw error;
  }
}
