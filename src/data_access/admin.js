const db = require("../../db/database.js");

const dataAccess = {
  async addUser(email, hashedPassword) {
    return await db("users").insert({
      email,
      password_hash: hashedPassword,
      is_super_admin: false,
    });
  },

  async deleteUserByEmail(email) {
    return await db("users").where("email", email).del();
  },
};

module.exports = dataAccess;
