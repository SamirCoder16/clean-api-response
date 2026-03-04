import crypto from "crypto";

export function requestIdMiddleware(req, res, next) {
  if (crypto.randomUUID) {
    req.requestId = crypto.randomUUID();
  } else {
    req.requestId = crypto.randomBytes(16).toString("hex");
  }
  next();
}
