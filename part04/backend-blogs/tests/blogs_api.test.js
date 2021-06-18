const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//Ejercicio 4.22
const jwt = require('jsonwebtoken')

const api = supertest(app)

//Play with this por testing
const InitialBlogNumber = 3

//Ejercicio 4.8
test('BLOGS FORMAT JSON & HAVE 3 BLOGS', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(InitialBlogNumber)
})

//Ejercicio 4.9
test('IS THE ID', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

//Ejercicio 4.10
test('ADD BLOG', async () => {

  const addBlog = {
    title: 'Mortadelo y Filemón',
    author: 'Francisco Ibáñez',
    url: 'http://google.es',
    likes: 0
  }

  await api
    .post('/api/blogs')
    //Ejercicio 4.22
    //Play with this for token authorization
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iktva3kiLCJpZCI6IjYwY2M2NTUxZjk0YmRkMTU1ODJkMDUxZSIsImlhdCI6MTYyNDAyNzc2N30.FMeHjCmVQ0JxhhWqa3dnwLKdY0uWduze3dhLJQFMCqs')
    .send(addBlog)
  expect(200)

  const existBlog = await api.get('/api/blogs')

  expect(existBlog.body).toHaveLength(InitialBlogNumber + 1)

})

//Ejercicio 4.11
test('LIKES ZERO', async () => {
  const zeroBlog = {
    title: 'Berserk',
    author:'Kentaro Miura',
    url: 'http://yahoo.com'
  }

  await api
    .post('/api/blogs')
    .send(zeroBlog)
  expect(200)

  const zb = await api.get('/api/blogs')

  expect(zb.body[zb.body.length - 1].likes).toBe(0)

})

//Ejercicio 4.12
test('NOT TITLE AND NOT URL', async () => {
  const onlyAuthorBlog = {
    //title:'Akira',
    //url:'http:as.com',
    author: 'Katsuhiro Otomo'
  }

  await api
    .post('/api/blogs')
    .send(onlyAuthorBlog)
  expect(400)

  const totalBlog = await api.get('/api/blogs')
  //At this point, the number of blog is 5
  expect(totalBlog.body).toHaveLength(5)

})

//Ejercicio 4.13
test('DELETE BLOG', async () => {
  //Change this for play
  const unId = '60cb1dd172aa2d01f88f395c'

  await api
    .delete(`/api/blogs/${unId}`)
  expect(204)

  const totalBlog = await api.get('/api/blogs')
  //At this point, the number of blog is 4
  expect(totalBlog.body).toHaveLength(4)  
})

//Ejercicio 4.14
test('EDIT BLOG', async () => {
  //Change this for play
  const unId = '60cb0526132859225817bef0'

  const addBlog = {
    title: 'Edited Blog',
    author: 'Another Author',
    url: 'http://world.eu',
    likes: 0
  }

  await api
    .put(`/api/blogs/${unId}`)
    .send(addBlog)
  expect(200)

})

afterAll(() => {
  mongoose.connection.close()
})
