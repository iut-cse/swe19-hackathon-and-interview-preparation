/* eslint-disable import/prefer-default-export */
import customLogger from './logger'

export const logControllerError = (
  functionName: string,
  file: string,
  message: string
): void => {
  customLogger.error(`Controller|${functionName}|${file}|${message}`)
}

export const logQueryError = (
  functionName: string,
  file: string,
  message: string
): void => {
  customLogger.error(`Query|${functionName}|${file}|${message}`)
}

export const logInfo = (
  functionName: string,
  file: string,
  message: string
): void => {
  customLogger.info(`Info:|${functionName}|${file}|${message}`)
}
export const logServiceError = (
  functionName: string,
  file: string,
  message: string
): void => {
  customLogger.error(`Service|${functionName}|${file}|${message}`)
}