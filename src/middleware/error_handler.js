module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    ctx.status = error.statusCode || error.status || 500;
    ctx.body = { error: error.message || "Server error" };
  }
};
