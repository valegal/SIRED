import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center py-4 px-8 bg-transparent text-white">
          <div className="text-5xl font-serif font-bond italic mx-auto pl-64 tracking-wide" style={{"text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)"}}>SIRED</div>
          <div>
            <Link to="/login">
            <button className="font-mono hover:bg-opacity-20 underline underline-offset-2 hover:bg-lime-200 hover:text-green-950 text-white font-semibold py-2 px-4 rounded-lg mr-8">
              Iniciar sesión
            </button>
            </Link>
            <Link to="/registro">
            <button className="bg-lime-300 bg-opacity-30 font-mono border-transparent  hover:text-white text-green-950 font-semibold py-2 px-5 rounded-lg">
              Registrarse
            </button>
            </Link>
          </div>
        </nav>
      );
    };
    
  
  export default Navbar;