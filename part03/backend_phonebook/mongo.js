/* eslint-disable no-undef */
//Ejercicio 3.12

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const nombre = process.argv[3]
const numero = process.argv[4]

const generateId = () => {

  return Math.floor((Math.random() * 999999) + 1)
}

const url =
  `mongodb+srv://fullstack:${password}@phonebook-app.eyykq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

if(nombre !== undefined && numero !== undefined){

  const person = new Person({
    id: generateId(),
    name: nombre,
    number: numero
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}else{
  Person.find({}).then(result => {
    console.log('PHONEBOOK:')
    result.forEach(person => {
      console.log(person.name + '   ' + person.number)
    })
    mongoose.connection.close()
  })
}