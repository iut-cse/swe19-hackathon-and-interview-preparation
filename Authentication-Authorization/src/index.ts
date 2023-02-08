import express from 'express'
import cors from 'cors'
import { testRouter } from './routers'
import { logInfo } from '../logger/customLogger'
import connect from './utils/mongodbConnect'
import userRouter from './routers/user.router'
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Welcome from admin backend')
})

app.use('/api',testRouter)
app.use('/api/v1/user', userRouter)

app.listen(port, async () => {
  logInfo('index.ts', './index.ts', `Server running on ${port}`)
  await connect()
})
