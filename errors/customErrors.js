class NotFoundError extends Error {
  constructor(message) {
    super(message);
    (this.name = "NotFoundError"), (this.statusCode = 404);
  }
}

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    (this.name = "UnAuthorized"), (this.statusCode = 401);
  }
}

module.exports = { UnAuthorizedError, NotFoundError };
