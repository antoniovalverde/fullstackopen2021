import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import Filtro from './components/Filtro'
import Personas from './components/Personas'
import Formulario from './components/Formulario'
import personaService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumero, setNewNumero] = useState('')
  const [newFiltro, setNewFiltro] = useState('')

  useEffect(() => {
    personaService
      .getAll()
      .then(respuesta => {
        setPersons(respuesta.data)
      })
  }, [])

  const handleCambioNombre = evento => {
      setNewName(evento.target.value);
  }

  const handleCambioNumero = evento => {
    setNewNumero(evento.target.value);
  }

  const handleFiltrarPersonas = evento => {
    setNewFiltro(evento.target.value);


  }

  const addPersona = (evento) => {
      evento.preventDefault()

      const foundNombre = persons.find(element => element.name === newName);

      console.log(foundNombre)

      const nombreObjeto = {
        name: newName,
        number: newNumero
      }

      if(foundNombre === undefined){

        personaService
        .create(nombreObjeto)
        .then(respuesta => {
          setPersons(persons.concat(respuesta.data))
          setNewName('')
          setNewNumero('')
        })

      }else{
        const result = window.confirm(`${foundNombre.name} is already added to phonebook, replace the old number with a new one?`)
        if(result){
          personaService
          .update(foundNombre.id, nombreObjeto)
          .then(respuesta => {
            const cambioPersona = persons.map(p =>
              p.id !== foundNombre.id ? p : respuesta.data
            )
             setPersons(cambioPersona)
             setNewName('')
             setNewNumero('')
          })            
        }
      }
   }

  const borrarPersona = (persona) => {
    const resultado = window.confirm(`Delete ${persona.name}?`)
    if (resultado){
      personaService
        .borrar(persona.id)
        .then((respuesta) => {
          setPersons(persons.filter((p) => p.id !== persona.id))
           setNewName('')
          setNewNumero('')
        })  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filtro onChange={handleFiltrarPersonas} />
      <br />
      <Formulario onS={addPersona} onCnombre={handleCambioNombre} onCnumero={handleCambioNumero} valueNombre={newName} valueNumero={newNumero}/>
      <h2>Numbers</h2>
      <Personas listado={persons} filtro={newFiltro} aborrar={borrarPersona}/>
    </div>
  )
}

export default App