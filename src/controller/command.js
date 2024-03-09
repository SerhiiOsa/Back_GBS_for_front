const userService = require("../service/user.js");
const validator = require("../middleware/command_validator.js");

const controller = {
  async createSuperadmin(email, password) {
    await validator({ email, password });

    const superadmin = true;
    await userService.createUser(email, password, superadmin);
  },
};

module.exports = controller;
