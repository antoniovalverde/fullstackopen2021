//Módulo Filtro

import React from 'react'

const Filtro = (props) => {  
    return (
        <div>
            Filter Persons: <input onChange={props.onChange}/>
        </div>
  )
}


export default Filtro