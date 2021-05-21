import React, { useState } from 'react'

const Personas = (props) => {
  return (
    <div>
      <ul>
        {props.listado.map(tema => <li key={tema.name}>{tema.name}</li>)}  
      </ul>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleCambioNombre = evento => {
      setNewName(evento.target.value);
  }

  const addNombre = (evento) => {
      evento.preventDefault()

      const found = persons.find(element => element.name === newName);

      console.log(found)
      if(found === undefined){
        const nombreObjeto = {
          name: newName
        }
        setPersons(persons.concat(nombreObjeto))
        setNewName('')
      }else{
        alert(`${newName} is already added to phonebook`)
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNombre}>
        <div>
          name: <input value={newName} onChange={handleCambioNombre}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Personas listado={persons} />
    </div>
  )
}

export default App