const winston = require('winston');
const moment = require('moment-timezone');



const logger = winston.createLogger({
    level: 'error', // Set log level to "error"
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {                    
            const timestamp = moment(info.timestamp).tz('Asia/Kolkata').format();            
            const pageName = info.pageName ? `[${info.pageName}]` : '';
            return `${timestamp} ${pageName} ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }), // Log to a file
        new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a separate file
    ]
});

module.exports = logger;