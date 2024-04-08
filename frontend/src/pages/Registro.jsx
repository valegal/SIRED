import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const Registro = () => {
  const [values, setValues] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    vinculacion: 'Estudiante de pregrado',
  });

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.nombres || !values.apellidos || !values.email || !values.password) {
      showAlert('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }
  
    try {
      const res = await axios.get('http://localhost:8081/usuarios');
      if (res.data.length === 0) {
        showAlert('Error', 'No hay usuarios registrados en la base de datos.', 'error');
        return;
      }
      
      const existEmail = res.data.some(userEmail => userEmail === values.email);
      if (existEmail) {
        showAlert('Error', 'El email ingresado ya está registrado.', 'error');
      } else {
        await axios.post('http://localhost:8081/registro', values);
        showAlert('Éxito', 'Usuario registrado correctamente.', 'success');
      }
    } catch (error) {
      showAlert('Error', 'Ha ocurrido un error al registrar el usuario.', 'error');
    }
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lime-600 to-green-700">
      <div className="bg-white shadow-lg rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de usuario | sistema GRIPV</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres</label>
            <input type="text" id="nombres" name="nombres" onChange={e => setValues({...values, nombres: e.target.value})} className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-6">
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input type="text" id="apellidos" name="apellidos" onChange={e => setValues({...values, apellidos: e.target.value})} className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" onChange={e => setValues({...values, email: e.target.value})} className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" onChange={e => setValues({...values, password: e.target.value})} className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-6">
            <label htmlFor="vinculacion" className="block text-sm font-medium text-gray-700">Tipo de vinculación</label>
            <select id="vinculacion" name="vinculacion" onChange={e => setValues({...values, vinculacion: e.target.value})} className="mt-1 px-4 py-2 block w-full text-sm rounded-lg border border-indigo-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="pregrado">Estudiante de pregrado</option>
              <option value="posgrado">Estudiante de posgrado</option>
              <option value="profesor">Profesor</option>
              <option value="egresado">Egresado</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-lime-600 to-green-700 text-white py-2 px-4 rounded-full hover:from-lime-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50">Registrarse</button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">¿Aún no tienes cuenta? <Link to="/login" className="text-lime-700">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
