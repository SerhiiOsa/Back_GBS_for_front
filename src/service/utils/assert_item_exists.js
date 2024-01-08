module.exports = async (item) => {
  if (!item) {
    const error = new Error("This item does not exist.");
    error.status = 400;
    throw error;
  }
};
