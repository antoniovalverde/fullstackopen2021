import React, { useState } from 'react'
import Filtro from './components/Filtro'
import Personas from './components/Personas'
import Formulario from './components/Formulario'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
  const [ newName, setNewName ] = useState('')
  const [newNumero, setNewNumero] = useState('')
  const [newFiltro, setNewFiltro] = useState('')

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
        setPersons(persons.concat(nombreObjeto))
        setNewName('')
        setNewNumero('')
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