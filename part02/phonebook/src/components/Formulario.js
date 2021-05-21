//Módulo Formulario

import React from 'react'

const Formulario = (props) => {

    return (
        <form onSubmit={props.onS}>
        <div>
          name: <input value={props.valueNombre} onChange={props.onCnombre}/>
          <br />
          number: <input value={props.valueNumero} onChange={props.onCnumero}/>
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
    )
  }


export default Formulario