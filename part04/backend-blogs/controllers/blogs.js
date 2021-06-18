const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//Ejercici 4.19
const jwt = require('jsonwebtoken')

//Ejercicio 4.17
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    password: 0,
    blogs: 0
  })

  response.json(blogs)
  
})

//Ejercicio 4.17 && 4.19
blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRETO)
  if( !token || !decodedToken.id ){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)

})

//Ejercicio 4.13 && 4.21
blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRETO)

  if( !token || !decodedToken.id ){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const idBlog = request.params.id
  const blog = await Blog.findById(idBlog)

  if(blog.user.toString() === decodedToken.id.toString()){
    await Blog.deleteOne( { _id: idBlog })
    response.sendStatus(204)
    
    /*await blog.remove()
    response.status(204).end()*/
  }else{
    response.status(400).json({error: 'invalid token or user not found'})
  }

})

//Ejercicio 4.14
blogsRouter.put('/:id', async (request, response) => {
  const datos = request.body

  const blog = await Blog.findById(request.params.id)

  blog.title = datos.title
  blog.author = datos.author
  blog.url = datos.url
  blog.likes = datos.likes

  await blog.save()
  response.status(200).end()
})

module.exports = blogsRouter