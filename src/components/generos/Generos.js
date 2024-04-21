import React, { useEffect, useState } from 'react';
import { obtenerGeneros, crearGenero, editarGenero, borrarGenero } from '../../services/GenerosService';

export default function Generos() {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);

  useEffect(() => {
    obtenerTodos();
  }, []);

  const obtenerTodos = async () => {
    try {
      const { data } = await obtenerGeneros();
      setGeneros(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEstadoChange = async (index) => {
    try {
      const updatedGeneros = [...generos];
      updatedGeneros[index].estado = !updatedGeneros[index].estado;
      await editarGenero(updatedGeneros[index]._id, { estado: updatedGeneros[index].estado ? 'activo' : 'inactivo' });
      setGeneros(updatedGeneros);
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el estado del género');
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombre) {
      alert('Por favor ingresa el nombre del género');
      return;
    }
    try {
      await crearGenero({ nombre, descripcion, estado: 'activo' });
      setNombre('');
      setDescripcion('');
      obtenerTodos();
    } catch (error) {
      console.error(error);
      alert('Error al crear el género');
    }
  };

  const handleActualizar = async () => {
    if (!generoSeleccionado) {
      alert('Por favor selecciona un género para actualizar');
      return;
    }
    try {
      await editarGenero(generoSeleccionado._id, { nombre, descripcion });
      setNombre('');
      setDescripcion('');
      setGeneroSeleccionado();
      obtenerTodos();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el género');
    }
  };

  const handleEliminar = async () => {
    if (!generoSeleccionado) {
      alert('Por favor selecciona un género para eliminar');
      return;
    }
    try {
      await borrarGenero(generoSeleccionado._id);
      setGeneroSeleccionado(null);
      obtenerTodos();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar el género');
    }
  };

  const handleSeleccionarGenero = (genero) => {
    setNombre(genero.nombre);
    setDescripcion(genero.descripcion);
    setGeneroSeleccionado(genero);
  };

  return (
    <div>
      <h1>Lista de Géneros</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Creado</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{genero.nombre}</td>
              <td>{genero.descripcion}</td>
              <td>{genero.fechaCreacion}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`flexSwitchCheckChecked-${index}`}
                    checked={genero.estado}
                    onChange={() => handleEstadoChange(index)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexSwitchCheckChecked-${index}`}
                  >
                    {genero.estado ? 'Activado' : 'Desactivado'}
                  </label>
                </div>
              </td>
              <td>
                <button type="button" className="btn btn-outline-primary" onClick={() => handleSeleccionarGenero(genero)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Crear Nuevo Género</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={handleNombreChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea className="form-control" id="descripcion" value={descripcion} onChange={handleDescripcionChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Crear</button>
        {generoSeleccionado && (
          <>
            <button type="button" className="btn btn-outline-success" onClick={handleActualizar}>Actualizar</button>
            <button type="button" className="btn btn-outline-danger" onClick={handleEliminar}>Eliminar</button>
          </>
        )}
      </form>
    </div>
  );
}
