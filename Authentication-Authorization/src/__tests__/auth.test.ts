import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'

const app = createServer()
// testing the auth server
describe('Auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })
  describe('given a valid signUp object', () => {
    it('should return a 200 status code', async () => {
      // testing signup
      const response = await request(app).post('/api/v1/user/create').send({
        name: 'Test user',
        nickName: 'test',
        email: 'testuser@gmail.com',
        password: '123456',
      })
      expect(response.statusCode).toBe(200)
    })

    it('should return a 400 status code', async () => {
      // duplicate mail
      const response = await request(app).post('/api/v1/user/create').send({
        name: 'Test user',
        nickName: 'test',
        email: 'testuser@gmail.com',
        password: '123456',
      })
      expect(response.statusCode).toBe(400)
    })

    // testing login
    describe('given a valid login object', () => {
      it('should return a 200 status code', async () => {
        const response = await request(app).post('/api/v1/user/login').send({
          email: 'testuser@gmail.com',
          password: '123456',
        })
        expect(response.statusCode).toBe(200)
      })
    })
    // testing login with wrong password
    describe('given a wrong password', () => {
      it('should return a 400 status code', async () => {
        const response = await request(app).post('/api/v1/user/login').send({
          email: 'testuser@gmail.com',
          password: '1234567',
        })
        expect(response.statusCode).toBe(400)
      })
    })
    
  })
})
