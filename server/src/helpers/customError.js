class customError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.message = message || "Error occurred. Try again";
    this.status =
      statusCode >= 400 && statusCode < 500 ? "client error" : "server error";
    this.isOperationalError =
      statusCode >= 400 && statusCode < 500 ? false : true;
    this.data = null;
    this.stack;
  }
}

export default customError;
