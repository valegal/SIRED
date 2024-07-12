import { Link } from "react-router-dom";

const Navbar = () => {
  const rol = localStorage.getItem('role');

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex flex-col md:flex-row justify-between items-center py-4 px-8 bg-transparent text-white">
      <div>
        {/* Logo */}
        <div className="text-5xl font-serif font-bold italic tracking-wide" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          SIRED
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center">
        {/* Navigation Links */}
        {rol ? (
          <>
            {rol === 'pregrado' && (
              <div className="ml-4">
                <Link to="/datos/pregrado" className="font-mono text-lime-500">Usuario Pregrado</Link>
              </div>
            )}
            {rol === 'posgrado' && (
              <div className="ml-4">
                <Link to="/datos/posgrado" className="font-mono text-lime-500">Usuario Posgrado</Link>
              </div>
            )}
            {rol === 'administrador' && (
              <div className="ml-4">
                <Link to="/datos/administrador" className="font-mono text-lime-500">Usuario Administrador</Link>
              </div>
            )}
          </>
        ) : (
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center">
            <Link to="/login" className="font-bold text-lg hover:bg-opacity-20 underline underline-offset-2 hover:bg-lime-200 hover:text-green-950 text-white py-2 px-4 rounded-lg mb-2 md:mb-0 md:mr-4">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="bg-lime-300 text-lg bg-opacity-30 font-bold border-transparent hover:text-white text-green-950 py-2 px-5 rounded-lg">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
