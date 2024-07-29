import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';

const Registro = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    vinculacion: 'pregrado',
  });

  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Ok'
    });
  };

  const validatePassword = (password) => {
    const lengthValid = password.length > 8;
    const numberValid = /\d/.test(password);
    return lengthValid && numberValid;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!values.nombres || !values.apellidos || !values.email || !values.password) {
      showAlert('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    if (!validatePassword(values.password)) {
      showAlert('Error', 'La contraseña debe tener más de 8 caracteres y contener al menos un número.', 'error');
      return;
    }

    try {
      // Verificar si el email ya está registrado
      const res = await axios.get('http://localhost:8081/usuarios');


      const existEmail = res.data.some(userEmail => userEmail === values.email);
      if (existEmail) {
        showAlert('Error', 'El email ingresado ya está registrado.', 'error');
        return;
      }

      // Registrar nuevo usuario
      const registerRes = await axios.post('http://localhost:8081/registro', values);
     

      if (registerRes.status === 201) {
        await showAlert('Éxito', 'Usuario registrado correctamente.', 'success');

        // Autenticar al usuario después del registro
        try {
          const loginRes = await axios.post('http://localhost:8081/login', {
            email: values.email,
            password: values.password
          });
     

          if (loginRes.status === 200) {
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('role', loginRes.data.role); 
            switch (loginRes.data.role) {
              case 'pregrado':
                navigate('/datos/pregrado');
                break;
              case 'posgrado':
                navigate('/datos/posgrado');
                break;
              case 'administrador':
                navigate('/datos/administrador');
                break;
              default:
                navigate('/datos');
                break;
            }
          } else {
            showAlert('Error', 'Error al iniciar sesión después del registro.', 'error');
          }
        } catch (loginError) {
          console.log('Error en login:', loginError);
          showAlert('Error', 'Hubo un problema al iniciar sesión después del registro. Por favor, intenta de nuevo.', 'error');
        }
      } else {
        showAlert('Error', 'No se pudo registrar el usuario. Intenta nuevamente.', 'error');
      }
    } catch (error) {
      console.log('Error en registro:', error);
      showAlert('Error', 'Ha ocurrido un error al registrar el usuario.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/primera.webp')]" >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 bg-white shadow-lg rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de usuario | datos sistema GRIPV</h2>
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
          <button type="submit" className="w-full bg-gradient-to-r from-lime-600 to-green-700 text-white py-2 px-4 rounded-full hover:from-lime-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50">Realizar el registro</button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">¿Ya tienes una cuenta? <Link to="/login" className="text-lime-700">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
