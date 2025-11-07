const developmentError = (error, res) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    message: error.message,
    status: error.status,
    statusCode: error.statusCode,
    isOperationalError: error.isOperationalError,
    data: error.data,
    errorTraceStack: error.stack,
  });
};

const productionError = (error, res) => {
  const statusCode = error.statusCode;
  if (error.isOperationalError) {
    return res.status(statusCode).json({
      message: error.message,
      status: error.status,
    });
  } else {
    return res.status(statusCode).json({ message: "Server failed" });
  }
};

const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV == "development") {
    developmentError(error, res);
  } else {
    productionError(error, res);
  }
};
export default globalError;
