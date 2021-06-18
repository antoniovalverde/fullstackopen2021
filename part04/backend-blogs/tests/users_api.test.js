//Ejercicio 4.16
const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const password = await bcrypt.hash('123456', 10)
    const user = new User({ username: 'root', password })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await api.get('/api/users')

    const newUser = {
      username: 'paco',
      name: 'Francisco Pérez',
      password: '654321',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('INVALID USERNAME', async () => {
    const usersAtStart = await api.get('/api/users')

    const badUser = {
      username: 'p',
      name: 'Ju',
      password: '0000',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400) //BAD REQUEST
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)

  })

  test('NOT UNIQUE USERNAME', async () => {
    const usersAtStart = await api.get('/api/users')

    const notUniqueUser = {
      username: 'root',
      name: 'Mal Usuario',
      password: '007',
    }

    const resultado = await api
      .post('/api/users')
      .send(notUniqueUser)
      .expect(400) //BAD REQUEST
      .expect('Content-Type', /application\/json/)

    expect(resultado.body.error).toContain('`username` to be unique')

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)

  })

})

afterAll(() => {
  mongoose.connection.close()
})