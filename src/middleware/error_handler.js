module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);

    ctx.status = error.statusCode || error.status || 500;

    if (ctx.status === 401) {
      ctx.body = { error: "Authentication error. Please log in." };
      return;
    }

    if (ctx.status === 500) {
      switch (error.code) {
        case "23505":
          ctx.status = 400;
          ctx.body = { error: "This item is already exist" };
          break;
        case "23503":
          ctx.status = 400;
          ctx.body = {
            error: "This item has links and cannot be deleted now.",
          };
          break;
        default:
          ctx.body = { error: "Internal server error." };
      }
    } else {
      ctx.body = { error: error.message };
    }
  }
};
