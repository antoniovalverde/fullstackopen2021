//Módulo Filtro

import React from 'react'

const Notificacion = (props) => {  
    if(props.message === ''){
        return (
            <div>
                <p>{props.message}</p>
            </div>
        )
    }else{
        return (
            <div>
                <p className='notiok'>{props.message}</p>
            </div>  
        )      
    }
}


export default Notificacion