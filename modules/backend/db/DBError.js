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
    message: getResponse(error.status),
    error: error.message,
  });
}

export { DBError, sendError };

function getResponse(status) {
  switch (status) {
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 409:
      return "Conflict";
    case 500:
      return "Internal Server Error";
    default:
      return "Unknown Error";
  }
}
