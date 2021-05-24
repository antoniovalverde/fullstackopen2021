//Módulo Pais

import React from 'react'

const Pais = (props) => {

    return (
        <li>{props.country} <button value={props.country} onClick={props.boton}>SHOW</button></li>
    )
}


export default Pais