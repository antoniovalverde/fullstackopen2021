const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

//Ejercicio 4.15
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const password = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    user: 0,
    likes: 0
  })

  response.json(users)

})

module.exports = usersRouter