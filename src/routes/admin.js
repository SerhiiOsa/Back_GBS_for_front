const Router = require("@koa/router");
const router = new Router();
const adminController = require("../controller/admin.js");

router.get("/login", adminController.login);

router.get("/dashboard", adminController.displayDashboard);

module.exports = router;
