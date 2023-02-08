import bcrypt from 'bcrypt'
import config from 'config'

import { logServiceError } from '../../logger/customLogger'
const FILENAME = 'src/utils/bcrypt.ts'
async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(config.get<number>('setWorkFactor'))
    const hashPass = await bcrypt.hash(password, salt)

    return hashPass
  } catch (error) {
    logServiceError('hashPassword',FILENAME, String(error))

    return 'Something wrong happen'
  }
}

async function comparePassword(
  userPassword: string,
  inputPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(inputPassword, userPassword)
  } catch (error) {
    logServiceError('comparePassword', FILENAME, String(error))

    return false
  }
}

export default {
  hashPassword,
  comparePassword,
}
