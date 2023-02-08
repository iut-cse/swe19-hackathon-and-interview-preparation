import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const socketServer = new Server(server, {
  cors: {
    origin: '*'
  }
})

socketServer.on('connection', socket => {
  socket.emit('your id', socket.id)
  
  socket.on('send message', body => {
    console.log('Message emit');
    socketServer.emit('message', body)
  })
})

server.listen(8800, () => {
  console.log('Server is listenning 0n 8800')
})
