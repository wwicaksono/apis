import { createLogger, transports } from 'winston';

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = createLogger({
  transports: [
    new (transports.Console)({
      timestamp: tsFormat,
      handleExceptions: true,
      colorize: true,
      level: 'debug',
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;
