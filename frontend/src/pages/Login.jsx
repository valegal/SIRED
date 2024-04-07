import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/login', values)
          .then(res => {
              if (res.status === 200) {
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('role', res.data.role); 
                  navigate('/datos');
                  // switch (res.data.role) {
                  //     case 'pregrado':
                  //         navigate('/datos/pregrado');
                  //         break;
                  //     case 'posgrado':
                  //         navigate('/datos/posgrado');
                  //         break;
                  //     case 'administrador':
                  //         navigate('/datos/administrador');
                  //         break;
                  //     default:
                  //         break;
                  // }
              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Error al iniciar sesión'
                  });
              }
          })
          .catch(err => {
              console.log(err);
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.'
              });
          });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white shadow-lg rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="email" name="email"
            onChange={e => setValues({...values, email: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" 
            onChange={e => setValues({...values, password: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <button onClick={handleSubmit} type="submit" className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Login</button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">¿Aún no tienes cuenta? <Link to="/registro" className="text-purple-500">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
