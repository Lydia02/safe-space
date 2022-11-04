const mongoose = require('mongoose')
const app = require('../routes/authRoutes')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/userModel')

beforeEach(async () => {
  await User.deleteMany({})
  await User.create({
    firstname: 'user',
    lastname: 'One',
    email: 'user1@mail.com',
    password: 'Password0!',
  })
})

describe('POST request to /login', () => {
  test('is successful if user is registered in the database', async () => {
    const response = await api
      .post('/login')
      .send({
        email:'user1@mail.com',
        password: 'Password0!',
      })
      .expect(200)

    expect(response.body).toHaveProperty('token')
  })

  test('returns error if incorrect details are sent', async () => {
    const response = await api
      .post('/login')
      .send({
        firstname: 'user',
      })
      .expect(403)

    expect(response.body).not.toHaveProperty('token')
  })
})

afterAll(() => {
  mongoose.connection.close()
})