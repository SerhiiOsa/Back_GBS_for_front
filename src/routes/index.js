const Router = require("@koa/router");
const authRoutes = require("../auth/routes.js");
const adminRoutes = require("./admin.js");
const specializationRoutes = require("./specialization.js");
const schoolRoutes = require("./school.js");
const vacancyRoutes = require("./vacancy.js");

const viewRouter = new Router();

viewRouter.use("/admin", adminRoutes.routes());

const apiRouter = new Router({
  prefix: "/api/v1",
});

apiRouter.use("/auth", authRoutes.routes());

apiRouter.use("/user", adminRoutes.routes());

apiRouter.use("/specializations", specializationRoutes.routes());

apiRouter.use("/schools", schoolRoutes.routes());

apiRouter.use("/vacancies", vacancyRoutes.routes());

module.exports = { viewRouter, apiRouter };
