const Router = require("@koa/router");
const router = new Router();
const authController = require("./controller");
const validator = require("../middleware/validator.js");

router.post("/login", validator.loginValidator, authController.login);

router.post(
  "/refresh",
  validator.tokenValidator,
  authController.refreshAccessToken,
);

router.post("/logout", authController.logout);

module.exports = router;
