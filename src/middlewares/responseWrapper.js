export function responseWrapper(req, res, next) {
  res.success = function (data, meta = {}) {
    const duration = Date.now() - req.startTime;
    return res.json({
      success: true,
      data,
      error: null,
      meta: {
        requestId: req.requestId,
        duration: `${duration}ms`,
        ...meta,
      },
    });
  };

  res.error = function (message, statusCode = 500) {
    const duration = Date.now() - req.startTime;

    return res.status(statusCode).json({
      success: false,
      data: null,
      error: {
        message,
        statusCode,
      },
      meta: {
        requestId: req.requestId,
        duration: `${duration}ms`,
      },
    });
  };

  next();
}
