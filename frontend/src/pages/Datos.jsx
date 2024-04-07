import Logout from "../components/Logout"
import { Link } from "react-router-dom"
// import Example from "../components/datos/Example";


function Datos() {

  const rol = localStorage.getItem('role');

  return (
    <div>Datos
      <Logout></Logout>


    <div className="p-2">
      <p>{rol}</p>
    </div>
<div className="m-12">
      <Link to="/datos/pregrado">
        <button className="btn bg-black text-white m-6 px-4 rounded-lg">Pregrado</button>
      </Link>
      <Link to="/datos/posgrado">
        <button className="btn bg-black text-white m-6 px-4 rounded-lg">Posgrado</button>
      </Link>
      <Link to="/datos/administrador">
        <button className="btn bg-green-600 text-white m-6 px-4 rounded-lg">Administrador</button>
      </Link>

      </div>  

      {/* <Example></Example> */}


    </div>
  )
}

export default Datos