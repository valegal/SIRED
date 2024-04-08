import NavUser from "../../components/NavUser";
import TablaGrupos from "../../components/datos/TablaGrupos";
import RutaActual from "../extras/RutaActual";

function GruposAdmin() {
  return (
    <div className="bg-lime-200/20 pt-16">
    <div>
        <NavUser></NavUser>
    </div>
        <RutaActual></RutaActual>
        <TablaGrupos></TablaGrupos>

    </div>
  )
}

export default GruposAdmin