//Módulo Personas

import React from 'react'
import Persona from './Persona'

const Personas = (props) => {

    const filtrados = props.listado.filter(
      persona => persona.name.toLowerCase().includes(props.filtro.toLowerCase())
    )
  
    return (
      <div>
        <ul>
          {filtrados.map(tema => <Persona key={tema.name} nom={tema.name} num={tema.number}/>)}  
        </ul>
      </div>
    )
  }


export default Personas