import NavUser from "../components/NavUser";
import ZoomSlider from "../components/ZoomSlider";


function Datos() {

  // const rol = localStorage.getItem('role');

  return (
    <div>
     <NavUser />

    {/* <div className="p-2">
      <p>{rol}</p>
    </div> */}

{/* <div className="m-12">

      <Link to="/datos/administrador">
        <button className="btn bg-green-600 text-white m-6 px-4 rounded-lg">Administrador</button>
      </Link>

      </div>   */}

     
      <ZoomSlider></ZoomSlider>

    </div>
  )
}

export default Datos