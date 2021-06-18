const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Ejercicio 4.15 & 4.16
const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      minlength: 3,
      unique: true
  },
  name: {
      type: String,
      required: false
  },
  password: {
      type: String,
      required: true,
      minlength: 3
  },
  //Ejercicio 4.17
  blogs: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
      }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User