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
      axios.post('${import.meta.env.VITE_API_URL}/login', values)
          .then(res => {
              if (res.status === 200) {
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('role', res.data.role); 
                  navigate('/datos');
                  switch (res.data.role) {
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
                          break;
                  }
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
    <>
  
    
  <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/primera.webp')]" >
  <div className="absolute inset-0 bg-black opacity-50"></div>
    
      <div className="bg-white shadow-xl z-10 rounded-lg p-8 max-w-md w-full">
      
        <h2 className="text-2xl font-bold m-4 mb-2 text-center">Iniciar sesión | datos sistema GRIPV</h2>
        <div className='mb-4 text-end text-xs hover:cursor-pointer text-green-700'><Link className="w-12 h-12 px-2 text-xl mr-2 rounded-full bg-lime-100" to="/">⭠</Link>VOLVER</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="email" name="email"
            onChange={e => setValues({...values, email: e.target.value})}
            className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-lime-300 focus:ring focus:ring-lime-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" 
            onChange={e => setValues({...values, password: e.target.value})}
            className="mt-1 px-4 py-2 block w-full rounded-lg border border-indigo-200 shadow-sm focus:border-lime-300 focus:ring focus:ring-lime-200" />
          </div>
          <button onClick={handleSubmit} type="submit" className="w-full bg-gradient-to-r from-lime-600 to-green-700 text-white py-2 px-4 rounded-full border-gray-200 hover:from-lime-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:ring-opacity-50">Ingresar</button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">¿No tienes una cuenta? <Link to="/registro" className=" text-lime-700">Registro aquí</Link></p>
        </div>

        
      </div>
      
    </div>
    
    </>
  );
}

export default Login;
