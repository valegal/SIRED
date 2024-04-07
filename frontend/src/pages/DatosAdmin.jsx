import CardsTablas from "../components/CardsTablas";
import NavUser from "../components/NavUser";
import TablaUsuarios from "../components/datos/TablaUsuarios"

function DatosAdmin() {

  const rol = localStorage.getItem('role');
  return (
    <div className="bg-lime-200/20 pt-20">
    <div>
      <NavUser></NavUser>
      </div>

      <span className="p-6 text-lg italic font-semibold text-green-700">Bienvenido, esta es la vista de {rol}. </span>
      <CardsTablas></CardsTablas>
      <TablaUsuarios></TablaUsuarios>
    </div>
  )
}

export default DatosAdmin