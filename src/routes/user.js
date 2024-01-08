const Router = require("@koa/router");
const router = new Router();
const userController = require("../controller/user.js");
const authorizedUser = require("../middleware/auth_user.js");
const superAdmin = require("../middleware/super_admin.js");
const validator = require("../middleware/validator.js");

router.use(authorizedUser, superAdmin);

router.post(
  "/register-user",
  validator.loginValidator,
  userController.registerUser,
);

router.post("/delete-user/:email", userController.deleteUser);

module.exports = router;
