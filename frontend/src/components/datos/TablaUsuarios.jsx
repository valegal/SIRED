import { useState, useEffect } from 'react';
import axios from 'axios';

const statusColorMap = {
  active: 'bg-green-500',
  paused: 'bg-red-500',
  vacation: 'bg-yellow-500',
};

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);


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

  return (
    <div className="m-4 overflow-x-auto rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombres
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Apellidos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vinculación
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap border">{usuario.id}</td>
              <td className="px-6 py-4 whitespace-nowrap border">{usuario.email}</td>
              <td className="px-6 py-4 whitespace-nowrap border">{usuario.role}</td>
              <td className="px-6 py-4 whitespace-nowrap border">{usuario.nombres}</td>
              <td className="px-6 py-4 whitespace-nowrap border">{usuario.apellidos}</td>
              <td className="px-6 py-4 whitespace-nowrap border">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[usuario.vinculacion]} text-red-800`}>
                  {usuario.vinculacion}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
