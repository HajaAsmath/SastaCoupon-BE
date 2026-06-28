const {
  createLogger, format, transports,
} = require('winston');
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');

require('dotenv').config();

const logDir = process.env.LOG_DIR
  ? join(__dirname, '..', '..', process.env.LOG_DIR)
  : join(__dirname, '..', '..', 'logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

const jsonFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'HH:mm:ss' }),
  format.printf(({
    timestamp, level, message, ...meta
  }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} ${level}: ${message}${metaStr}`;
  }),
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: jsonFormat,
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
    new transports.File({
      filename: join(logDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024, // 10 MB
      maxFiles: 5,
    }),
    new transports.File({
      filename: join(logDir, 'combined.log'),
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: join(logDir, 'exceptions.log') }),
  ],
  exitOnError: false,
});

module.exports = logger;
