const Router = require("@koa/router");
const authRoutes = require("../auth/routes.js");
const adminRoutes = require("./admin.js");
const userRoutes = require("./user.js");
const specializationRoutes = require("./specialization.js");
const schoolRoutes = require("./school.js");
const vacancyRoutes = require("./vacancy.js");
const videoRoutes = require("./video.js");

const viewRouter = new Router();

viewRouter.use("/", adminRoutes.routes());

const apiRouter = new Router({
  prefix: "/api/v1",
});

apiRouter.use("/auth", authRoutes.routes());

apiRouter.use("/user", userRoutes.routes());

apiRouter.use("/specializations", specializationRoutes.routes());

apiRouter.use("/schools", schoolRoutes.routes());

apiRouter.use("/vacancies", vacancyRoutes.routes());

apiRouter.use("/videos", videoRoutes.routes());

module.exports = { viewRouter, apiRouter };
