const { koaBody } = require("koa-body");

const multipartConfig = koaBody({
  multipart: true,
  urlencoded: true,
  json: true,
});

module.exports = multipartConfig;
