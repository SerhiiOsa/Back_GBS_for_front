module.exports = async (data, ctx) => {
  if (data) {
    ctx.status = 200;
    ctx.body = data;
  } else {
    ctx.status = 500;
    ctx.body = { error: "Internal server error." };
  }
};
