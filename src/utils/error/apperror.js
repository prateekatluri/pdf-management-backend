class AppError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.explaination = message;
    this.statuscode = statuscode;
  }
}

module.exports = AppError;
