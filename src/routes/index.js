const Router = require("@koa/router");
const authRoutes = require("../auth/routes.js");
const adminRoutes = require("./admin.js");
const specializationRoutes = require("./specialization.js");
const schoolRoutes = require("./school.js");

const router = new Router({
  prefix: "/api/v1",
});

router.use("/auth", authRoutes.routes());

router.use("/admin", adminRoutes.routes());

router.use("/specializations", specializationRoutes.routes());

router.use("/schools", schoolRoutes.routes());

module.exports = router;
