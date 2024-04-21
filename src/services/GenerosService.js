import { axiosConfig } from "../configuration/axiosConfig"


const obtenerGeneros = (estado = true) => {
    return axiosConfig.get('generos?estado='+estado, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
}

const crearGenero = (data = {}) => {
    return axiosConfig.post('/generos', data, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
}

const editarGenero = (id, data = {}) => {
  return axiosConfig.put(`/generos/${id}`, data, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
}



const borrarGenero = id => {
    return axiosConfig.delete('/generos'+id, {}, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })
}


export {
    obtenerGeneros,
    crearGenero,
    editarGenero,
    borrarGenero
}