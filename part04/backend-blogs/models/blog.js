const mongoose = require('mongoose')

//Ejercicio 4.12
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  //Ejercicio 4.17
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)