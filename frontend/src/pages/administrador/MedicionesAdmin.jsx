import NavUser from "../../components/NavUser"
import TablaMediciones from "../../components/datos/TablaMediciones"
import RutaActual from "../extras/RutaActual"

function MedicionesAdmin() {
  return (
    <div className="bg-lime-200/20 pt-20">
    <div>
      <NavUser></NavUser>
      </div>
      <RutaActual></RutaActual>
      <TablaMediciones></TablaMediciones>
    </div>
  )
}

export default MedicionesAdmin