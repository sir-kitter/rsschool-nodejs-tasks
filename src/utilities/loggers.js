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
      filename: `${__dirname}/../../logs/info.log`,
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 1024,
      maxFiles: 3
    }),
    new winston.transports.File({
      level: 'error',
      format: timestampFormat,
      filename: `${__dirname}/../../logs/error.log`,
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 1024,
      maxFiles: 3
    })
  ]
});

const requestLoggerCallback = (req, res, next) => {
  winstonLogger.info({
    method: req.method,
    url: req.url,
    params: req.params,
    body: req.body
  });
  next();
};

module.exports = {
  requestLoggerCallback,
  winstonLogger
};
