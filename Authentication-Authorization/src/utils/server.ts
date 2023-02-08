import express, { Response } from 'express'
import cors from 'cors'

import userRoter from '../routers/user.router'

function createServer() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.get('/', (req, res) => {
    res.send('Welcome from admin-server')
  })
  app.use('/api/v1/user', userRoter)

  return app
}

export default createServer
