import mongoose from 'mongoose'
import config from 'config'
import logger from '../../logger/logger'

async function connect() {
  const dbUri = config.get<string>('MONGODB_CONNECTION_URL')

  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(dbUri)
    logger.info('Database connected')
  } catch (error) {
    logger.info(error)
    logger.error('Could not connect to db')
    process.exit(1)
  }
}

export default connect
