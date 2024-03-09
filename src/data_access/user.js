const db = require("../../db/database.js");

const dataAccess = {
  async addUser(email, hashedPassword, superadmin) {
    const trx = await db.transaction();

    try {
      let result;

      if (!superadmin) {
        result = await trx("users").insert({
          email,
          password_hash: hashedPassword,
          is_super_admin: false,
        });
      } else {
        await trx("users").where("is_super_admin", true).update({
          is_super_admin: false,
        });

        result = await trx("users")
          .insert({
            email,
            password_hash: hashedPassword,
            is_super_admin: true,
          })
          .onConflict("email")
          .merge({
            email,
            password_hash: hashedPassword,
            is_super_admin: true,
          });
      }

      await trx.commit();
      return result;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  },

  async deleteUserByEmail(email) {
    return await db("users").where("email", email).del();
  },
};

module.exports = dataAccess;
