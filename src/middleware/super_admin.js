const jwt = require("jsonwebtoken");
const config = require("../auth/config");

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get(config.cookie.accessToken.name);

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
