import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center py-4 px-8 bg-transparent text-white">
          <div className="text-5xl font-serif font-bond italic mx-auto pl-64 tracking-wide">SIRED</div>
          <div>
            <Link to="/login">
            <button className="bg-lime-200 border-2 border-lime-200 hover:border-lime-600 hover:bg-lime-600 text-lime-700 font-semibold py-2 px-4 rounded mr-2">
              Iniciar sesión
            </button>
            </Link>
            <Link to="/registro">
            <button className="bg-lime-300 bg-opacity-10 border-2 hover:border-lime-600 border-lime-200 hover:bg-lime-600 text-lime-700 font-semibold py-2 px-4 rounded">
              Registrarse
            </button>
            </Link>
          </div>
        </nav>
      );
    };
    
  
  export default Navbar;