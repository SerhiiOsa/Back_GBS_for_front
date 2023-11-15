const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  const token = ctx.request.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized. Token is missing." };
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized. Invalid token." };
  }
};
