import winston from 'winston'

const transports = []

if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console())
} else {
  transports.push(
    new winston.transports.Console({
      // handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.cli(),
        winston.format.splat(),
      ),
    }),
  )
}

export const Logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
})
