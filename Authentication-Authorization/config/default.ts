/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config()

export default {
  PORT: process.env.PORT,
  MONGODB_CONNECTION_URL: process.env.MONGODB_CONNECTION_URL,
  setWorkFactor: Number(process.env.SET_WORK_FACTOR),
  accessTokenTtl: '1000m',
  privateKey: process.env.RSA_PRIVATE_KEY,
  publicKey: process.env.RSA_PUBLIC_KEY,
}
