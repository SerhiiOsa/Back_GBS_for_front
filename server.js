require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const { koaBody } = require("koa-body");
const router = require("./src/routes/index.js");
const errorHandler = require("./src/middleware/error_handler.js");
const runServer = require("./src/service/server.js");

const app = new Koa();

app.use(errorHandler);
app.use(cors());
app.use(koaBody({ multipart: true, urlencoded: true, json: true }));
app.use(router.routes());
app.use(router.allowedMethods());
runServer(app);
