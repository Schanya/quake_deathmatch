const winston = require('winston');
const { level } = require('../env');

const logTransports = [
    new (winston.transports.Console)({
        timestamp: () => new Date().toISOString(),
        formatter: (options) => (
            `${options.timestamp()}  ${options.level.toUpperCase()}: ${options.message ? options.message : ''} ${(options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : '')}` // eslint-disable-line
        ),
    }),
];

const logger = winston.createLogger({
    transports: logTransports,
    level: level,
});

module.exports = logger;