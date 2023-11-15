const db = require("../../db/database.js");

const dataAccess = {
  async findUserByEmail(email) {
    return db("users").where("email", email).first();
  },

  async findUserById(userId) {
    return db("users").where("id", userId).first();
  },

  async insertRefreshToken(userId, tokenValue, refreshTokenExpiresAt) {
    return db("refresh_tokens").insert({
      user_id: userId,
      token: tokenValue,
      expires_at: refreshTokenExpiresAt,
    });
  },

  async findRefreshTokenByValue(tokenValue) {
    return db("refresh_tokens").where("token", tokenValue).first();
  },

  async deleteRefreshTokensByUserId(userId) {
    return db("refresh_tokens").where("user_id", userId).del();
  },
};

module.exports = dataAccess;
