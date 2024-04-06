
import { Link } from 'react-router-dom'; 

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
      <div className="bg-white shadow-lg rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Login</button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600">¿Aún no tienes cuenta? <Link to="/registro" className="text-purple-500">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
