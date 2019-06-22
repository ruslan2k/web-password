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
// const user1 = { username: userName1, email: email1, password: password1 }
// const user2 = { username: userName2, email: email2, password: password2 }
const user1 = {
  sponsor: 'sponsor',
  username: userName1,
  email: email1,
  firstName: 'firstName',
  secondName: 'secondName',
  phone: 375,
  country: 'ru',
  password: 'p@$$w0rD',
  finPassword: 'FiNp@$$w0rD',
  // skype: 'notFound',
}

beforeAll(done => dbConnection.on('connected', done))

afterAll(() => {
  dbConnection.close()
})

describe('User', function () {
  let token
  test('register user', async function () {
    const response = await request(server)
      .post('/user/')
      .send(user1)
    expect(response.status).toEqual(200)
    const user = response.body
    expect(user).toHaveProperty('username')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('token')
    token = user.token
  })

  test('GET /user/', async function () {
    const response = await request(server)
      .get('/user/')
      .query({ token: token })
    expect(response.status).toEqual(200)
  })
})

describe('User /resetPassword', function () {
  test('POST /resetPassword/ Bad params', async function () {
    const response = await request(server)
      .post('/user/resetPassword/')
      .send({ username: user1.username })
    expect(response.status).toEqual(400)
  })
  test.skip('POST /resetPassword/ success', async function () {
    const response = await request(server)
      .post('/user/resetPassword/')
      .send({ username: user1.username, type: 0 })
    expect(response.status).toEqual(200)
    console.log('response.body', response.body)
  })
})
