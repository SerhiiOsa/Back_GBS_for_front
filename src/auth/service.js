const bcrypt = require("bcryptjs");
const dataAccess = require("./data_access.js");
const createTokens = require("./create_tokens.js");

const authService = {
  async userLogin(email, password) {
    try {
      const user = await dataAccess.findUserByEmail(email);

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        return null;
      }

      const { accessToken, refreshToken } = await createTokens(user, false);

      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  },

  async refreshAccessToken(refreshToken) {
    try {
      const token = await dataAccess.findRefreshTokenByValue(refreshToken);

      if (!token) {
        return null;
      }

      const currentTimestamp = new Date();

      if (token.expires_at < currentTimestamp) {
        return null;
      }

      const user = await dataAccess.findUserById(token.user_id);

      if (!user) {
        return null;
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await createTokens(user, true);

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  },

  async userLogout(refreshToken) {
    try {
      const token = await dataAccess.findRefreshTokenByValue(refreshToken);

      if (!token) {
        return null;
      }

      await dataAccess.deleteRefreshTokensByUserId(token.user_id);

      return true;
    } catch (error) {
      console.error("Database error:", error);
      return false;
    }
  },
};

module.exports = authService;
