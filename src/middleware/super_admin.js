const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
  const token = ctx.request.headers.authorization;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.is_super_admin) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = {
      error: "You do not have permission to access this resource.",
    };
  }
};
