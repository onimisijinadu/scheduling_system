module.exports = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => next(err));
  };
};

/*
    async error handler is a higher order function that 
    takes in an async function and returns a new function that wraps 
    the async function in a try/catch block. If the async function throws an error, 
    the error is passed to the next middleware (error handler) using next(err).
     This allows for centralized error handling in Express applications.
*/
