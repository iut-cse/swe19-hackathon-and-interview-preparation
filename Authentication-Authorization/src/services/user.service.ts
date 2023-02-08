import { omit } from 'lodash'
import { logServiceError } from '../../logger/customLogger'
import { UserDoc, User } from '../interfaces/modelInterfaces/user.interface'
import UserModel from '../models/user'
import { bcryptUtils } from '../utils'
import ModelError from '../utils/ModelError'

const FILENAME = 'admin-server/src/services/user.service.ts'
async function createUser(data: User): Promise<UserDoc | ModelError> {
  try {
    const user = await UserModel.create(data)
    return user
  } catch (error) {
    logServiceError('createUser', FILENAME, String(error))
    return new ModelError(error)
  }
}

async function findUserByUserId(userId: string): Promise<UserDoc | ModelError> {
  try {
    const user = await UserModel.findById(userId).orFail()
    return user
  } catch (error) {
    logServiceError('findUserByUserId', FILENAME, String(error))
    return new ModelError(error)
  }
}

async function findUserByUserName(
  username: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ username }).orFail()
    return true
  } catch (error) {
    logServiceError('findUserByUserId', FILENAME, String(error))
    return false
  }
}

async function findUserByEmail(email: string): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ email }).orFail()
    return true
  } catch (error) {
    logServiceError('findUserByEmail', FILENAME, String(error))
    return false
  }
}

const loginUser = async (
  email: string,
  password: string
): Promise<any | ModelError> => {
  try {
    const user = await UserModel.findOne({
      email
    }).orFail()
    const isPassMatch = await bcryptUtils.comparePassword(
      user.password,
      password
    )
    logServiceError(
      'loginUser',
      FILENAME,
      String('Password compare result:' + isPassMatch)
    )

    if (isPassMatch) {
      return omit(user.toJSON(), 'password')
    } else {
      return false
    }
  } catch (error) {
    logServiceError('loginUser', FILENAME, String(error))
    return new ModelError(error)
  }
}

export default {
  createUser,
  findUserByUserId,
  findUserByUserName,
  findUserByEmail,
  loginUser,
}
