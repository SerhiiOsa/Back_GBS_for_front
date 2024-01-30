require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const render = require("@ladjs/koa-views");
const { cwd } = require("node:process");
const path = require("path");
const router = require("./src/routes/index.js");
const errorHandler = require("./src/middleware/error_handler.js");
const config = require("./src/config/config.js");
const runServer = require("./src/service/server.js");

const app = new Koa();

app.use(render(path.join(cwd(), "views/pages")));
app.use(require("koa-static")("public"));
app.use(errorHandler);
app.proxy = true;
app.use(cors(config.corsOptions));
app.use(koaBody());
app.use(router.viewRouter.routes());
app.use(router.apiRouter.routes());
app.use(router.apiRouter.allowedMethods());
runServer(app);
