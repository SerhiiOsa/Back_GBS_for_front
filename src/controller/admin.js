const adminService = require("../service/admin.js");
const CustomError = require("../service/custom_error.js");

const adminController = {
  async registerUser(ctx) {
    const { email, password } = ctx.request.body;
    const user = await adminService.createUser(email, password);

    if (user instanceof CustomError) {
      ctx.status = user.status;
      ctx.body = { error: user.message };
    } else if (user) {
      ctx.status = 201;
      ctx.body = { message: "User created successfully" };
    } else {
      ctx.status = 400;
      throw new Error("Unable to create user");
    }
  },

  async deleteUser(ctx) {
    const userEmail = ctx.params.email;
    const result = await adminService.deleteUser(userEmail);

    if (result instanceof CustomError) {
      ctx.status = result.status;
      ctx.body = { error: result.message };
    } else if (result) {
      ctx.status = 200;
      ctx.body = { message: "User deleted successfully" };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Internal server error." };
    }
  },
};

module.exports = adminController;
