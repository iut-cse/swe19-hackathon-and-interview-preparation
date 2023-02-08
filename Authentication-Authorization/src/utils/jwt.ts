import config from 'config'
import jwt from 'jsonwebtoken'

const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

type JwtUserTokenObject = { userId: string; name: string, role: string[] }

function signJwt(
  object: JwtUserTokenObject,
  options?: jwt.SignOptions | undefined
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}

export default {
  signJwt,
  verifyJwt,
}
