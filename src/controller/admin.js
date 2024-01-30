const authorizedUser = require("../middleware/auth_user.js");

const adminController = {
  async startPage(ctx) {
    await ctx.redirect("/admin/login");
  },

  async login(ctx) {
    await ctx.render("login.ejs");
  },

  async displayDashboard(ctx, next) {
    try {
      await authorizedUser(ctx, next);
      await ctx.render("dashboard.ejs");
    } catch (error) {
      await ctx.redirect("/admin/login");
    }
  },
};

module.exports = adminController;
