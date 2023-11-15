module.exports = async (data, ctx) => {
  if (data) {
    ctx.status = 200;
    ctx.body = data;
  }
};
