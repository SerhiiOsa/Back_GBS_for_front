module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);

    if (error.message === "jwt expired") {
      ctx.status = 401;
    } else {
      ctx.status = error.statusCode || error.status || 500;
    }

    if (ctx.status === 500) {
      ctx.body = "Internal server error";
    } else {
      ctx.body = { error: error.message };
    }
  }
};
