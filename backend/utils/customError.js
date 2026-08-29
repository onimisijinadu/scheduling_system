class customError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.message = message;
    this.statusCode = statusCode || 500;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    /* this error is operational error
        def: Operational error the problems taht we can predict that will happen 
        at somepoint in the future, we need to hable them in advance

        examples : user trying to access an invalid route, inputing invalid data, application failed to connect to server and request timedOut etc.
        */
    this.isOperational = true;

    /*  Stack trace

    stack trace will tell you where the error actually happens in the code;
    

    but in this context the base Error class already capture the stack trace so i just call it
        */

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = customError;
