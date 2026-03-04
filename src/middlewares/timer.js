export function timerMiddleware(req, res, next) {
  req.startTime = Date.now();
  next();
}
