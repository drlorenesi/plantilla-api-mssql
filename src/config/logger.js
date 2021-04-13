require('express-async-errors');
const { createLogger, format, transports } = require('winston');
// const Sentry = require('winston-transport-sentry-node').default;

// const options = {
//   sentry: {
//     dsn: process.env.SENTRY,
//   },
// };

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    // new Sentry(options),
    new transports.File({ filename: 'errors.log' }),
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception.\n%s', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection.\n%s', error);
});

module.exports = logger;
