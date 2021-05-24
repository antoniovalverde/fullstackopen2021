import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Filtro from './components/Filtro'
import Paises from './components/Paises'

const App = () => {
  const [paises, setPaises] = useState([])
  const [newFiltro, setNewFiltro] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(respuesta => {
      const paises = respuesta.data
      setPaises(paises)
    })
  }, [])

  const handleFiltrarPaises = evento => {
    setNewFiltro(evento.target.value);
  }

  return (
    <div>
      <h2>COUNTRIES APP</h2>
      <Filtro onChange={handleFiltrarPaises} />
      <br />
      <Paises listado={paises} filtro={newFiltro} boton={handleFiltrarPaises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
