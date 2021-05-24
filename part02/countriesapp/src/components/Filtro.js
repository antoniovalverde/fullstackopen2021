//Módulo Filtro

import React from 'react'

const Filtro = (props) => {  
    return (
        <div>
            FIND COUNTRIES: <input onChange={props.onChange}/>
        </div>
  )
}


export default Filtro