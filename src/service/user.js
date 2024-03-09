const bcrypt = require("bcryptjs");
const userDataAccess = require("../data_access/user.js");
const authDataAccess = require("../auth/data_access.js");
const CustomError = require("./custom_error.js");
const config = require("../config/config.js");

const userService = {
  async createUser(email, password, superadmin) {
    try {
      if (!superadmin) {
        const existingUser = await authDataAccess.findUserByEmail(email);
        if (existingUser)
          return new CustomError(
            400,
            "This email address is already registered.",
          );
      }

      const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);

      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await userDataAccess.addUser(
        email,
        hashedPassword,
        superadmin,
      );

      return newUser;
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  },

  async deleteUser(email) {
    const user = await authDataAccess.findUserByEmail(email);

    if (!user) {
      return new CustomError(400, "User does not exist");
    }

    if (user.is_super_admin) {
      return new CustomError(400, "User cannot be deleted");
    }

    const deletedUser = await userDataAccess.deleteUserByEmail(email);

    return deletedUser;
  },
};

module.exports = userService;
