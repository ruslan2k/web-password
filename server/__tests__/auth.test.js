const { dbConnection } = require('../db')
const request = require('supertest')
const server = require('../app')
const crypto = require('crypto')
const password1 = crypto.randomBytes(16).toString('hex')
const password2 = crypto.randomBytes(16).toString('hex')
const userName1 = 'user' + password1
const userName2 = 'user' + password2
const email1 = userName1 + '@example.com'
const email2 = userName2 + '@example.com'

const user1 = {
  sponsor: "sponsor",
  username: userName1,
  email: email1,
  firstName: 'firstName',
  secondName: 'secondName',
  phone: '375',
  country: 'ru',
  password: 'p@$$w0rD',
  finPassword: 'FiNp@$$w0rD',
  skype: 'notFound',
}

beforeAll(done => dbConnection.on('connected', done))

afterAll(() => {
  dbConnection.close()
})

describe('Auth', function () {
  let token
  test('register user', async function () {
    const response = await request(server)
      .post('/api/user/')
      .send(user1)
    expect(response.status).toEqual(200)
    const user = response.body
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('token')
    token = user.token
  })

  test('Wrong params', async function () {
    const response = await request(server)
      .get('/api/auth/')
      .query({ a: 'A', b: 'B' })
    expect(response.status).toEqual(400)
  })

  test('Wrong username', async function () {
    const response = await request(server)
      .get('/api/auth/')
      .query({ username: 'BadUserName', password: user1.password })
    expect(response.status).toEqual(404)
  })

  test('Wrong password', async function () {
    const response = await request(server)
      .get('/api/auth/')
      .query({ username: user1.username, password: 'password' })
    expect(response.status).toEqual(401)
  })

  test('GET /auth/ success', async function () {
    const response = await request(server)
      .get('/api/auth/')
      .query({ username: user1.username, password: user1.password })
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
  })
})
