const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const dataAccess = require("./data_access.js");
const config = require("./config.js");

module.exports = async (user, toRefresh) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, is_super_admin: user.is_super_admin },
    config.jwt.secret,
    { expiresIn: config.jwt.accessTokenExpiresIn },
  );

  const refreshToken = uuidv4();

  const refreshTokenExpiresAt = new Date(
    Date.now() + config.cookie.options.maxAge,
  );

  if (toRefresh) {
    await dataAccess.deleteRefreshTokensByUserId(user.id);
  }

  await dataAccess.insertRefreshToken(
    user.id,
    refreshToken,
    refreshTokenExpiresAt,
  );

  return { accessToken, refreshToken };
};
