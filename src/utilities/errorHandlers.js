const logger = require('./loggers');
const httpStatus = require('http-status');

class badResponseError extends Error {
  constructor(status, ...params) {
    super(params);
    this.status = status;
  }
}

const unhandledHandler = (err, req, res, next) => {
  if (err) {
    logger.error({
      type: 'unhandled error',
      method: req.method,
      url: req.originalUrl,
      body: req.body
    });
    if (err instanceof badResponseError) {
      res.status(err.status).send(httpStatus[err.status]);
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
    }
  }
  next();
};

/* eslint-disable no-process-exit */

const uncaughtHandler = (err, origin) => {
  logger.error({
    type: 'uncaught exception',
    error: err,
    origin
  });
  logger.winstonLogger.on('finish', () => process.exit(1));
};

const unhandledRejectionHandler = (reason, promise) => {
  logger.error({
    type: 'unhandled rejection',
    reason,
    promise
  });
  logger.winstonLogger.on('finish', () => process.exit(1));
};

const catchInternal = func => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  badResponseError,
  unhandledHandler,
  uncaughtHandler,
  unhandledRejectionHandler,
  catchInternal
};
