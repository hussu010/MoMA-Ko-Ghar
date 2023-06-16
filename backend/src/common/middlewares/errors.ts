import { ErrorRequestHandler } from "express";

const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  next(err);
};

const errorResponder: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
};

export { errorLogger, errorResponder };
