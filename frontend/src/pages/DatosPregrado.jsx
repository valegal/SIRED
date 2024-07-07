import CardsTablas from "../components/CardsTablas";
import NavUser from "../components/NavUser";
// import TablaUsuarios from "../components/datos/TablaUsuarios"
import RutaActual from "./extras/RutaActual";

function DatosPregrado() {

  const rol = localStorage.getItem('role');
  return (
    <div className="bg-lime-200/20 min-h-screen pt-16">
    <div>
      <NavUser></NavUser>
      </div>

      <RutaActual></RutaActual>

      <span className="p-6 text-lg italic font-semibold text-green-700">Bienvenido, esta es la vista de {rol}. </span>
      <CardsTablas></CardsTablas>
      
      {/* <TablaUsuarios></TablaUsuarios> */}

      
    </div>
  )
}

export default DatosPregrado