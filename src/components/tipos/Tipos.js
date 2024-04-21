import React, { useEffect, useState } from 'react';
import { axiosConfig } from '../../configuration/axiosConfig';
import { obtenerTipos, crearTipo, actualizarTipo } from '../../services/TiposService';

export default function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoId, setTipoId] = useState(null);
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    obtenerTipos(setTipos); // Obtener tipos al cargar el componente
  }, []);

  
  const handleCrearTipo = async (event) => {
    event.preventDefault();
    if (!nombre) {
      alert('Por favor ingresa el tipo');
      return;
    }
    try {
      await crearTipo({ nombre, descripcion, estado: 'activo' });
      setNombre('');
      setDescripcion('');
      obtenerTipos();
    } catch (error) {
      console.error(error);
      alert('Error al crear el puto tipo');
    }
  };

  const handleActualizarTipo = async () => {
    try {
      if (!tipoId) {
        console.error('tipoId no está definido');
        return;
      }
  
      const tipoData = { nombre, descripcion };
      await actualizarTipo(tipoId, tipoData);
      setNombre('');
      setDescripcion('');
      setTipoId(null);
      setEditing(false);
      obtenerTipos(setTipos);
    } catch (error) {
      console.error('Error al actualizar el tipo:', error);
    }
  };

  const handleEditarTipo = (tipo) => {
    setNombre(tipo.nombre);
    setDescripcion(tipo.descripcion);
    setTipoId(tipo.id);
    setEditing(true); // Cambiar el estado de edición a true cuando se inicia la edición
  };

  const handleEliminarTipo = async (tipoId) => {
    try {
      await axiosConfig.delete(`/tipo/${tipoId}`);
      obtenerTipos(setTipos); // Actualizar lista de tipos después de eliminar
    } catch (error) {
      console.error('Error al eliminar el tipo:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Tipos disponibles</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tipos.map(tipo => (
          <li key={tipo.id}>
            {tipo.nombre} - {tipo.descripcion}
            <button style={{ marginLeft: '10px' }} onClick={() => handleEditarTipo(tipo)}>Editar</button>
            <button style={{ marginLeft: '10px' }} onClick={() => handleEliminarTipo(tipo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <h2>{tipoId ? 'Actualizar Tipo' : 'Crear Tipo'}</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div>
          {editing ? ( // Mostrar los botones de actualización y cancelar solo cuando estamos en modo edición
            <>
              <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={handleActualizarTipo}>Actualizar</button>
              <button style={{ marginLeft: '10px', backgroundColor: 'yellow', color: 'black', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={() => {setTipoId(null); setNombre(''); setDescripcion(''); setEditing(false);}}>Cancelar</button>
            </>
          ) : (
            <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }} onClick={handleCrearTipo}>Crear</button>
          )}
        </div>
      </div>
    </div>
  );
}
