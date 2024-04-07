import CardsTablas from "../components/CardsTablas";
import NavUser from "../components/NavUser";
import TablaUsuarios from "../components/datos/TablaUsuarios"
import RutaActual from "./extras/RutaActual";

function DatosAdmin() {

  const rol = localStorage.getItem('role');
  return (
    <div className="bg-lime-200/20 pt-20">
    <div>
      <NavUser></NavUser>
      </div>

      <RutaActual></RutaActual>

      <span className="p-6 text-lg italic font-semibold text-green-700">Bienvenido, esta es la vista de {rol}. </span>
      <CardsTablas></CardsTablas>
      {/* <div className="w-10/12 border-b border-dotted border-green-700/20 mx-auto my-6"></div>  */}
      <TablaUsuarios></TablaUsuarios>
    </div>
  )
}

export default DatosAdmin