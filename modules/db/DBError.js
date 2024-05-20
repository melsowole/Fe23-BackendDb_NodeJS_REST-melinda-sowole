class DBError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

function sendError(res, error) {
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
}

export { DBError, sendError };
