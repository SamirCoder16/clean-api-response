import HttpError from "../errors/HttpError.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.error(err.message, err.statusCode);
  }
  return res.error("Internal Server Error", 500);
}
