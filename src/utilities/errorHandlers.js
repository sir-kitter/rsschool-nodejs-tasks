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
    logger.winstonLogger.error({
      method: req.method,
      url: req.url,
      query: req.query,
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

module.exports = {
  badResponseError,
  unhandledHandler
};
