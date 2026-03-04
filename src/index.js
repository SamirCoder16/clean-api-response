import { errorHandler } from "./middlewares/errorHandler.js";
import { requestIdMiddleware } from "./middlewares/requestId.js";
import { responseWrapper } from "./middlewares/responseWrapper.js";
import { timerMiddleware } from "./middlewares/timer.js";
import { buildPaginationMeta } from "./utils/pagination.js";
import HttpError from "./errors/HttpError.js";

const cleanApiResponse = [
  requestIdMiddleware,
  timerMiddleware,
  responseWrapper,
];

export { cleanApiResponse, errorHandler, HttpError, buildPaginationMeta };
