import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filtro from './components/Filtro'
import Personas from './components/Personas'
import Formulario from './components/Formulario'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumero, setNewNumero] = useState('')
  const [newFiltro, setNewFiltro] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(respuesta => {
      const gente = respuesta.data
      setPersons(gente)
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
      if(foundNombre === undefined){
        const nombreObjeto = {
          name: newName,
          number: newNumero
        }

        axios.post('http://localhost:3001/persons', nombreObjeto).then(respuesta => {
          setPersons(persons.concat(respuesta.data))
          setNewName('')
          setNewNumero('')
        })
        
      }else{
        alert(`${newName} is already added to phonebook`)
      }
   }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filtro onChange={handleFiltrarPersonas} />
      <br />
      <Formulario onS={addPersona} onCnombre={handleCambioNombre} onCnumero={handleCambioNumero} valueNombre={newName} valueNumero={newNumero}/>
      <h2>Numbers</h2>
      <Personas listado={persons} filtro={newFiltro}/>
    </div>
  )
}

export default App