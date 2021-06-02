import axios from 'axios'
                //Ejercicio 3.9
//const baseUrl = 'http://localhost:3001/api/persons'
//Ejercicio 3.11
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const borrar = id => {
    return axios.delete(`${baseUrl}/${id}`)
  }

const ps = {getAll, create, update, borrar}

export default ps