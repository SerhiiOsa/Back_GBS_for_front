const Router = require("@koa/router");
const router = new Router();
const userController = require("../controller/user.js");
const authorizedUser = require("../middleware/auth_user.js");
const superAdmin = require("../middleware/super_admin.js");
const validator = require("../middleware/validator.js");
const multipartConfig = require("./utils/body_parser_config.js");

router.use(authorizedUser, superAdmin);

router.post(
  "/register-user",
  multipartConfig,
  validator.loginValidator,
  userController.registerUser,
);

router.post("/delete-user/:email", userController.deleteUser);

module.exports = router;
