import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuariosPorPagina] = useState(12);
  // eslint-disable-next-line no-unused-vars
  const [tablaHeight, setTablaHeight] = useState(600); 
  // eslint-disable-next-line no-unused-vars
  const [tablaWeight, setTablaWeight] = useState(1200);// Altura fija de la tabla
  const columnas = ["ID", "Email", "Role", "Nombres", "Apellidos", "Vinculación", ""];

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8081/usuarios/todos');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleEliminarUsuario = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c22f2f',
      cancelButtonColor: '#0b850d',
      confirmButtonText: 'Sí, eliminar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8081/usuarios/${id}`);
        const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
        setUsuarios(nuevosUsuarios);
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        Swal.fire('¡Error!', 'Hubo un problema al eliminar el usuario.', 'error');
      }
    }
  };

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = usuarios.slice(indicePrimerUsuario, indiceUltimoUsuario);

  return (
    <div className='flex flex-col items-center mb-12'>
      <h1 className="text-4xl font-bold text-green-700 mt-8 my-4">Todos los usuarios</h1>
      <div className="m-4 overflow-x-auto rounded-lg" style={{ height: tablaHeight, width: tablaWeight, overflowY: 'scroll' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-lime-200/40">
            <tr>
              {columnas.map((columna) => (
                <th key={columna} className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuariosActuales.map((usuario, index) => (
              <tr key={usuario.id} className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-nowrap border">{indicePrimerUsuario + index + 1}</td>
                <td className="px-6 py-2 tewhitespace-nowrap border">{usuario.email}</td>
                <td className="px-6 py-2 whitespace-nowrap border">
                  <p className={` text-center rounded-xl text-white ${
                    usuario.role === 'administrador' ? 'bg-indigo-800' :
                      usuario.role === 'pregrado' ? 'bg-lime-600/90' :
                        usuario.role === 'posgrado' ? 'bg-sky-600' : ''
                  }`}>{usuario.role}</p>
                </td>
                <td className="px-6 py-2 whitespace-nowrap border">{usuario.nombres}</td>
                <td className="px-6 py-2 whitespace-nowrap border">{usuario.apellidos}</td>
                <td className="px-6 py-2 whitespace-nowrap border">{usuario.vinculacion}</td>
                <td className="px-6 py-2 whitespace-nowrap border cursor-pointer">
                  <Icon
                    icon="material-symbols:delete"
                    className='text-red-500/60'
                    width="20"
                    height="20"
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
          <div>
            Página {paginaActual} de {Math.ceil(usuarios.length / usuariosPorPagina)}
          </div>
          <button
            className="bg-lime-200 hover:shadow-lg text-lime-900 italic font-bold py-2 px-4 rounded-full"
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={indiceUltimoUsuario >= usuarios.length}
          >
            Siguiente
          </button>
        </div>
       
      </div>
      
    </div>
  );
};

export default TablaUsuarios;
