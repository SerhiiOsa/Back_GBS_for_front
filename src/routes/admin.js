const Router = require("@koa/router");
const router = new Router();
const adminController = require("../controller/admin.js");

router.get("", adminController.startPage);

router.get("admin/login", adminController.login);

router.get("admin/dashboard", adminController.displayDashboard);

module.exports = router;
