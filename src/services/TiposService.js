import { axiosConfig } from '../configuration/axiosConfig';


const obtenerTipos = async (setTipos) => {
    try {
      const response = await axiosConfig.get('/tipo');
      console.log(response.data);
      setTipos(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos de películas:', error);
    }
  }
  
  const crearTipo = async (tipoData) => {
    // Verificar si tipoData tiene valores válidos
    if (!tipoData || !tipoData.nombre || !tipoData.descripcion) {
      throw new Error('Los datos del tipo son inválidos');
    }
  
    try {
      const response = await axiosConfig.post('/tipo', tipoData);
      return response.data; // Devuelve los datos del nuevo tipo creado
    } catch (error) {
      throw new Error('Error al crear el tipo de película:', error);
    }
  }
  
  const actualizarTipo = async (tipoId, tipoData) => {
    try {
      const response = await axiosConfig.put(`/${tipoId}`, tipoData);
      return response.data; // Devuelve los datos actualizados del tipo
    } catch (error) {
      throw new Error('Error al actualizar el tipo de película:', error);
    }
  }
  
  export { obtenerTipos, crearTipo, actualizarTipo };