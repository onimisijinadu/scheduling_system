module.exports = (err, req, res, next) => {
  // we assign status code to error because we don't know the status code the error will send.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    // Operational, trusted error: send details to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown bug: don't leak error details to user
    console.error("ERROR:", err.message);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
