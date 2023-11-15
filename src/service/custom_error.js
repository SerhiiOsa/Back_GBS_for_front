module.exports = class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "CustomError";
    this.status = status;
  }
};
