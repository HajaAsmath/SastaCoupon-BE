const {createLogger, format, transports} = require('winston')
const { join } =  require('path');
require('dotenv').config();
const { existsSync, mkdirSync } = require('fs');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = join(__dirname, process.env.LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logFormat = format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new transports.Console({
            level: 'silly',
            format: format.combine(format.splat(), format.colorize()),
        }),
        // new winstonDaily({
        //     level: 'debug',
        //     datePattern: 'YYYY-MM-DD',
        //     dirname: logDir + '/debug', // log file /logs/debug/*.log in save
        //     filename: `%DATE%.log`,
        //     maxFiles: 30, // 30 Days saved
        //     json: false,
        //     zippedArchive: true,
        // }),
        // new winstonDaily({
        //     level: 'error',
        //     datePattern: 'YYYY-MM-DD',
        //     dirname: logDir + '/error', // log file /logs/error/*.log in save
        //     filename: `%DATE%.log`,
        //     maxFiles: 30, // 30 Days saved
        //     handleExceptions: true,
        //     json: false,
        //     zippedArchive: true,
        // })
    ]
});

module.exports = logger