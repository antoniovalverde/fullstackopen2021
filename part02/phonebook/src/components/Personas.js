//Módulo Personas

import React from 'react'
import Persona from './Persona'

const Personas = ({listado, filtro, aborrar}) => {

    const filtrados = listado.filter(
      persona => persona.name.toLowerCase().includes(filtro.toLowerCase())
    )
  
    return (
      <div>
        <ul>
          {filtrados.map(tema => <Persona key={tema.name} nom={tema.name} num={tema.number} persona={tema} borrando={aborrar}/>)}  
        </ul>
      </div>
    )
  }


export default Personas