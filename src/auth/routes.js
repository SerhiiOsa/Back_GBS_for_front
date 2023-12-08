const Router = require("@koa/router");
const router = new Router();
const authController = require("./controller");

router.post("/login", authController.login);

router.post("/refresh", authController.refreshAccessToken);

router.post("/logout", authController.logout);

module.exports = router;
