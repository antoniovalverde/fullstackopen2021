import React, { useState } from 'react'

const Personas = (props) => {

  const filtrados = props.listado.filter(
    persona => persona.name.toLowerCase().includes(props.filtro.toLowerCase())
  )

  return (
    <div>
      <ul>
        {filtrados.map(tema => <li key={tema.name}>{tema.name}</li>)}  
      </ul>
    </div>
  )
}

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
      <div>
          Filter Persons: <input onChange={handleFiltrarPersonas}/>
      </div>
      <br />
      <form onSubmit={addPersona}>
        <div>
          name: <input value={newName} onChange={handleCambioNombre}/>
          <br />
          number: <input value={newNumero} onChange={handleCambioNumero}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Personas listado={persons} filtro={newFiltro}/>
    </div>
  )
}

export default App