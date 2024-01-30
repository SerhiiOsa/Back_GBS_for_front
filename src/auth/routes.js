const Router = require("@koa/router");
const router = new Router();
const authController = require("./controller");
const multipartConfig = require("../routes/utils/body_parser_config");

router.use(multipartConfig);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;
