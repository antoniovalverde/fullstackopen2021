//Módulo Persona

import React from 'react'

const Persona = ({nom, num, persona, borrando}) => {

    return (
        <li>{nom} {num} <button onClick={() => borrando(persona)}>DELETE</button></li>
    )
}


export default Persona