//Módulo Paises

import React from 'react'
import Pais from './Pais'
import { useState } from 'react'
import axios from 'axios'

const Paises = (props) => {  

    const apiKey = process.env.REACT_APP_API_KEY

    const [tiempo, setTiempo] = useState({})

    const filtrados = props.listado.filter(
        pais => pais.name.toLowerCase().includes(props.filtro.toLowerCase())
    )

    if(props.filtro !== ''){

        if (filtrados.length > 10){
            return (
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            )
        }else if(filtrados.length <= 10 && filtrados.length > 1){
            return (
                <div>
                    <ul>
                        {filtrados.map(country => <Pais key={country.name} country={country.name} boton={props.boton} />)}  
                    </ul>
                </div>
            )            
        }else if(filtrados.length === 1){

            axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${filtrados[0].capital}`).then((respuesta) => {
                setTiempo(respuesta.data.current)
            })

            return (
                <div>
                    <h2>{filtrados[0].name}</h2>
                    <p><strong>Capital: </strong>{filtrados[0].capital}</p>
                    <p><strong>Population: </strong>{filtrados[0].population}</p>
                    <h4>LANGUAGES</h4>
                    <ul>
                        {filtrados[0].languages.map(lenguaje => <li key={lenguaje.name}>{lenguaje.name}</li>)}
                    </ul>
                    <img height="200" src={filtrados[0].flag} alt="flag" />
                    <br />
                    <h2>WEATHER IN {filtrados[0].capital}</h2>
                    <p>TEMPERATURE: {tiempo.temperature}ºC</p>
                    <img src={tiempo.weather_icons[0]} alt="The Weather" />
                    <p><strong>Wind </strong>{tiempo.wind_speed} mph direction {tiempo.wind_dir}.</p>
                </div>
            )  
        }else{
            return (
                <div>
                    <p>COUNTRY NOT FOUND</p>
                </div>
            )            
        }


    }else{
        return (
            <div>
                <p>...</p>
            </div>
        )
    }
}


export default Paises