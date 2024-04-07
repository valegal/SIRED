import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const contador = 1;
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

  return (
    <div className='flex flex-col items-center'>
      <h1 className="text-4xl font-bold text-green-700 mt-8 my-4">Todos los usuarios</h1>
      <div className="m-4 overflow-x-auto rounded-lg">
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
          {usuarios.map((usuario, index) => (
            <tr key={usuario.id} className="hover:bg-gray-100">
              <td className="px-6 py-2 whitespace-nowrap border">{contador + index}</td>
              <td className="px-6 py-2 tewhitespace-nowrap border">{usuario.email}</td>
              <td className="px-6 py-2 whitespace-nowrap border">
              <p className={`px-2 text-center rounded-xl text-white ${
                usuario.role === 'administrador' ? 'bg-indigo-800' :
                usuario.role === 'pregrado' ? 'bg-lime-600/90' :
                usuario.role === 'posgrado' ? 'bg-sky-600' : ''
              }`}>{usuario.role}</p>
            </td>

              <td className="px-6 py-2 whitespace-nowrap border">{usuario.nombres}</td>
              <td className="px-6 py-2 whitespace-nowrap border">{usuario.apellidos}</td>
              <td className="px-6 py-2 whitespace-nowrap border">

                  {usuario.vinculacion}

              </td>
              <td className="px-6 py-2 whitespace-nowrap border cursor-pointer"> <Icon
                    icon="material-symbols:delete"
                    className='text-red-500/60'
                    width="20"
                    height="20"
                    onClick={() => handleEliminarUsuario(usuario.id)}
                  /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TablaUsuarios;
