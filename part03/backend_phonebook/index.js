const express = require('express')
//Ejercicio 3.7
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

app.use(express.json())

//Ejercicio 3.16 Y *** Ejercicio 3.20 ***
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).send({ error: error.message })
  } else if (error.message && error.status){
    return response.status(error.status).send({ error:error.message })
  }

  next(error)
}

//Ejercicio 3.8
morgan.token('custom', (req) => {
  return JSON.stringify(req.body)
})

//Ejercicio 3.9
const cors = require('cors')

app.use(cors())

//Ejercicio 3.11
app.use(express.static('build'))

//Ejercicio 3.7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :custom'))

//Ejercicio 3.1 Y *** Ejercicio 3.13 ***
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    // eslint-disable-next-line no-undef
    .catch(error => next(error))
})

//Ejercicio 3.2 Y *** Ejercicio 3.18 ***
app.get('/info', (request, response) => {

  Person.find({})
    .then((personas) => {
      const cantidad = personas.length
      const fecha = new Date()
      response.send(`<p>PHONEBOOK HAS INFO FOR ${cantidad} PEOPLE</p>
                          <p>${fecha}</p>`)
    })
})

//Ejercicio 3.3 Y ******** Ejercicio 3.13 **********
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//Ejercicio 3.4 Y *** Ejercicio 3.15 ***
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Ejercicio 3.14 Y *** Ejercicio 3.19 ***
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(salvadoOk => {
      console.log('agregado!!!')
      response.json(salvadoOk)
    })
    .catch(error => next(error))

})

//Ejercicio 3.17
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  //Ejercicio 3.20
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//Ejercicio 3.16
app.use(errorHandler)

//Ejercicio 3.10
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})