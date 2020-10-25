const winston = require('winston');

const timestampFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
  winston.format.prettyPrint()
);

const winstonLogger = new winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'info',
      format: timestampFormat,
      filename: `${__dirname}/../../logs/all.log`,
      handleExceptions: false,
      json: true,
      maxsize: 1024 * 1024,
      maxFiles: 3
    }),
    new winston.transports.File({
      level: 'error',
      format: timestampFormat,
      filename: `${__dirname}/../../logs/exceptions.log`,
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 1024,
      maxFiles: 3
    })
  ]
});

const error = msg => winstonLogger.error(msg);

const info = msg => winstonLogger.info(msg);

/* eslint-disable callback-return */

const requestLoggerCallback = (req, res, next) => {
  next();
  winstonLogger.info({
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    params: req.params,
    body: req.body,
    status: res.statusCode
  });
};

module.exports = {
  requestLoggerCallback,
  winstonLogger,
  error,
  info
};
