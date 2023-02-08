import { createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp }) => {
  const errorMessages = message.split('|')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const returnMessage = `${timestamp} [${level}] [Origin:${errorMessages[0]}] [Function:${errorMessages[1]}] [File:${errorMessages[2]}] [Message:${errorMessages[3]}]`
  return returnMessage
})

const customLogger = createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    format.splat(),
    format.simple(),
    timestamp({ format: 'HH:mm:ss' }),
    myFormat
  ),
  transports: [new transports.Console()],
})

export default customLogger
