const Router = require("@koa/router");
const router = new Router();
const adminController = require("../controller/admin.js");
const authorizedUser = require("../middleware/auth_user.js");
const superAdmin = require("../middleware/super_admin.js");
const validator = require("../middleware/validator.js");

router.use(authorizedUser, superAdmin);

router.post(
  "/register-user",
  validator.loginValidator,
  adminController.registerUser,
);

router.post("/delete-user/:email", adminController.deleteUser);

module.exports = router;
